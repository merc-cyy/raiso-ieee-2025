from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase_tfidf_recommendation import VolunteerRecommender 
from dotenv import load_dotenv
import os
from supabase import create_client, Client

app = FastAPI()
load_dotenv()


# declare origin/s
origins = [
    "https://nuvolunteers.org/",
    "localhost:3000"
]


# CORS setup for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # or your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Supabase init
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

#jobs
jobs = {}



# Define request schema
class ExampleRequest(BaseModel):
    userid: str

@app.post("/recommend/")
def recommend(request: ExampleRequest):
    try:
        # Load recommender once

        print("JUST STARTING")
        user_id = request.userid
        print(f"USERID:{user_id}")
        recommender = VolunteerRecommender(supabase)
        print("INIT IS DONE")
        recommender.fetch_data()
        print("Before MODEL FIT")
        recommender.fit()
        print("MODEL FIT IS DONE")
        user_embedding = recommender.build_user_profile(user_id)
        print("USER RECOMMENDATIONS TAKEN INTO CONSIDERATION")
        recommendations = recommender.recommend_for_user(user_embedding, top_n=6)
        print(f"RECOMMENDATIONS:{recommendations}")
        return {
            'jobs' : recommendations
        }
    except Exception as e:
        import traceback
        print("bad ERROR OCCURRED:")
        traceback.print_exc() 
        return {"error": str(e)}
