from fastapi import FastAPI, Request
import faiss
import numpy as np
import json
from sentence_transformers import SentenceTransformer

# Initialize FastAPI app
app = FastAPI()

# Load SBERT model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Load FAISS index
index = faiss.read_index("schema_index.faiss")

# Load table descriptions
with open("table_descriptions.json", "r") as f:
    table_descriptions = json.load(f)

# Load schema
with open("schema.json", "r") as f:
    schema_data = json.load(f)

# Add CORS middleware (to allow React frontend to connect)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://v0-nlpsqlpipeline.vercel.app/"],  # Replace with your frontend URL
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

@app.post("/find_schema/")
async def find_schema(request: Request):
    """Find relevant schema based on the user query."""
    try:
        # Parse JSON body
        data = await request.json()
        user_query = data["query"]

        # Convert query to embedding
        query_embedding = model.encode(user_query, convert_to_numpy=True).reshape(1, -1)

        # Search FAISS index for top 3 matches
        D, I = index.search(query_embedding, k=3)

        # Get matched tables and similarity scores
        matched_tables = [schema_data[i] for i in I[0]]
        similarity_scores = [float(np.exp(-D[0][j])) for j in range(3)]  


        # Return results
        return {
            "tables": matched_tables,
            "similarity_scores": similarity_scores
        }
    except Exception as e:
        return {"error": str(e)}

# Run the app
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)