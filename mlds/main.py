from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from supabase import create_client, Client
import os

# Your recommender imports
from supabase_keybert_recommendation import VolunteerRecommender as KeyBERTRecommender
from supabase_tfidf_recommendation import VolunteerRecommender as TFIDFRecommender
from llm_recommendation import llmRecommender

load_dotenv()

app = FastAPI()

# ------------------ CORS ------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend domain in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ Supabase Setup ------------------
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# ------------------ Models ------------------
class RecommendRequest(BaseModel):
    userid: str

class BlurbRequest(BaseModel):
    blurb: str

# ------------------ Instantiate Models ------------------
keybert_model = KeyBERTRecommender(supabase)
tfidf_model = TFIDFRecommender(supabase)
llm_model = llmRecommender(supabase)

# ------------------ Routes ------------------
@app.get("/posts/")
def get_all_jobs(limit: int = 250):
    try:
        response = supabase.table("jobs").select("*").limit(limit).execute()
        return response.data
    except Exception as e:
        return {"error": str(e)}

@app.post("/interests/")
def save_interest(payload: dict):
    try:
        # Expected payload: { user_id, job_id, type: "like" or "apply" }
        supabase.table("user_interests").insert(payload).execute()
        return {"status": "success"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/interests/liked/ids/{user_id}")
def get_liked_jobs(user_id: str):
    try:
        response = supabase.table("user_interests").select("job_id").eq("user_id", user_id).eq("type", "like").execute()
        return [row["job_id"] for row in response.data]
    except Exception as e:
        return {"error": str(e)}

@app.get("/interests/applied/ids/{user_id}")
def get_applied_jobs(user_id: str):
    try:
        response = supabase.table("user_interests").select("job_id").eq("user_id", user_id).eq("type", "apply").execute()
        return [row["job_id"] for row in response.data]
    except Exception as e:
        return {"error": str(e)}

@app.post("/recommend/")
def recommend(request: RecommendRequest):
    try:
        keybert_model.fetch_data()
        keybert_model.fit()
        user_embedding = keybert_model.build_user_profile(request.userid)
        recs = keybert_model.recommend_for_user(user_embedding, top_n=1000)
        return {"jobs": recs.to_dict(orient="records")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

@app.post("/llm_recommend/")
def llm_recommend(request: BlurbRequest):
    try:
        llm_model.fetch_data()
        llm_model.load_data()
        recs = llm_model.recommend(request.blurb)
        return {"jobs": recs.to_dict(orient="records")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

@app.post("/tfidf_recommend/")
def tfidf_recommend(request: RecommendRequest):
    try:
        tfidf_model.fetch_data()
        tfidf_model.fit()
        recs = tfidf_model.recommend_for_user(request.userid, top_n=1000)
        return {"jobs": recs.to_dict(orient="records")}
    except Exception as e:
        import traceback
        traceback.print_exc()
        return {"error": str(e)}

# ------------------ Cloud Run Entry ------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))\