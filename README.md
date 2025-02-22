# nlp-to-sql-pipeline
This project helps find the most relevant tables from a database schema using AI. It takes user query and matches it with the tables using Sentence Transformers and FAISS to return filtered outputs.

How It Works: It understands user queries and finds tables
It converts table descriptions into AI generated embeddings for quick search 
Uses FAISS to find the best matches 
Easy connection to a frontend with CORS support

Technologies Used: FastAPI for backend 
Sentence Transformers for text processing
FAISS for fast searching
Uvicorn to run the server
Vercel for frontend
Huggingface as AI model 
Tailwind and ShadCN as CSS
