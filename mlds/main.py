from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from supabase import create_client, Client

from supabase_keybert_recommendation import VolunteerRecommender
from llm_recommendation import llmRecommender

# Load env variables
load_dotenv()

# FastAPI app
app = FastAPI()

# CORS (allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use specific domains for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase client
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Instantiate recommender objects ONCE
recommender = VolunteerRecommender(supabase)
generator = llmRecommender(supabase)

# Preload embeddings and setup once
print("Bootstrapping KeyBERT recommender...")
recommender.fetch_data()
recommender.fit()
print("KeyBERT ready.")

print("Bootstrapping LLM generator...")
generator.fetch_data()
generator.load_data()
generator.build_qa_chain()
print("LLM generator ready.")

# Request models
class UserRequest(BaseModel):
    userid: str

class BlurbRequest(BaseModel):
    blurb: str

# Volunteer recommendation route
@app.post("/recommend/")
def recommend(req: UserRequest):
    try:
        user_embedding = recommender.build_user_profile(req.userid)
        recommendations = recommender.recommend_for_user(user_embedding, top_n=1000)
        return {"jobs": recommendations.to_dict(orient="records")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

# LLM-based generation route
@app.post("/generate/")
def generate(req: BlurbRequest):
    try:
        gen_recommendations = generator.recommend(req.blurb)
        return {"jobs": gen_recommendations.to_dict(orient="records")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}