from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client
from supabase_keybert_recommendation import VolunteerRecommender 
from llm_recommendation import llmRecommender
import os
import traceback

# Load environment
load_dotenv()

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # consider whitelisting in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase setup
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize recommenders ONCE
print("Bootstrapping KeyBERT Recommender...")
recommender = VolunteerRecommender(supabase)
recommender.fetch_data()
recommender.fit()
print("KeyBERT is ready.")

print("Bootstrapping LLM Recommender...")
generator = llmRecommender(supabase)
generator.fetch_data()
generator.load_data()
generator.build_qa_chain()
print("LLM Generator is ready.")

# Request schemas
class ExampleRequest(BaseModel):
    userid: str

class ExampleRequestGen(BaseModel):
    blurb: str

# Routes
@app.post("/recommend/")
def recommend(request: ExampleRequest):
    try:
        user_embedding = recommender.build_user_profile(request.userid)
        recommendations = recommender.recommend_for_user(user_embedding, top_n=1000)
        return {'jobs': recommendations.to_dict(orient="records")}
    except Exception as e:
        print("bad ERROR OCCURRED:")
        traceback.print_exc()
        return {"error": str(e)}

@app.post("/generate/")
def generate(req: ExampleRequestGen):
    try:
        gen_recommendations = generator.recommend(req.blurb)
        return {'jobs': gen_recommendations.to_dict(orient="records")}
    except Exception as e:
        print("bad ERROR OCCURRED:")
        traceback.print_exc()
        return {"error": str(e)}