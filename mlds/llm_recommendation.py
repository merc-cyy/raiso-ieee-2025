import pandas as pd
import numpy as np
import openai
import tiktoken

from langchain.chains import RetrievalQA
from langchain.document_loaders import TextLoader
from langchain_openai import OpenAIEmbeddings
from langchain.llms import OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.document_loaders.csv_loader import CSVLoader
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

class llmRecommender:
    def __init__(self, supabase):
        self.supabase = supabase
        self.data = None
        self.embeddings = OpenAIEmbeddings()
        self.llm = ChatOpenAI(model_name="gpt-4o", temperature=0)
        self.vectorstore = None
        self.retriever = None
        self.qa_chain = None
        self.load_data()

    def fetch_data(self):
        # Fetch opportunities from the Supabase database
        response = self.supabase.table('jobs').select(
            'id, title, organization, description, date, location, skills, requirement'
        ).execute()
        # Load data into a DataFrame
        self.df = pd.DataFrame(response.data)
        self.df["summarized"] = ("title: " + self.df.Title.str.strip() + "; description: " + 
                                 self.df.Description.str.strip() + "; date: " + 
                                 self.df.Date.str.strip() + "; skills: " + 
                                 self.df.Skills.str.strip() + 
                                 self.df.Date.str.strip() + "; requirements: " + 
                                 self.df.Requirement.str.strip())

    def load_data(self):
        # Convert DataFrame to CSV format
        csv_data = self.df[['summarized']].to_csv(index=False)
        # Create a CSVLoader instance
        loader = CSVLoader(file_path=csv_data)
        # Load documents from the CSV data
        documents = loader.load()
        # Split documents into smaller chunks
        text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        texts = text_splitter.split_documents(documents)
        # Create a Chroma vector store from the texts
        self.vectorstore = Chroma.from_documents(texts, self.embeddings)

    def build_qa_chain(self):
        # Create a retriever from the vector store
        self.retriever = self.vectorstore.as_retriever(search_kwargs={"k": 20})
        # Create a RetrievalQA chain
        self.qa_chain = RetrievalQA.from_llm(
            llm=self.llm,
            retriever=self.retriever
        )

    def recommend(self, blurb):
        # Build the QA chain
        self.build_qa_chain()

        # Get recommendations based on the query
        # the query is the blurb plus a given prompt
        self.query = f"Based on the following blurb: {blurb}, recommend 20 relevant opportunities. (only the title)"
        response = self.qa_chain({"query": self.query})
        text = response['result']

        # parse the result to extract the recommended opportunities
        recommended_opportunities = pd.DataFrame()
        for line in text.split('\n'):
            # Check if the line starts with a number followed by a period and space
            if line.strip() and line[0].isdigit() and '. ' in line:
                # Extract the content after the number and period
                title = line.split('. ', 1)[1]
                
                try:
                    # Find the corresponding row in the DataFrame
                    row = self.df[self.df['Title']==title]
                    if not row.empty:
                        recommended_opportunities = pd.concat([recommended_opportunities, row])
                except Exception as e:
                    print(f"Error finding row for title '{title}': {e}")
                    continue

        # final output: list of opportunities with every info on it
        return recommended_opportunities
                        
