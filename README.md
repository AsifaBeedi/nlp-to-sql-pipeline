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


Steps we followed in building the model

Step 1: Understanding the Problem
Databases have many tables, and it’s difficult to figure out where to find specific information. Instead of checking each table manually, we wanted a system that:

Lets users type a normal question like, "Which tables store customer orders?"
Finds the best matches automatically.
Works quickly, even with large databases.


Step 2: Choosing the Right Tools

We used an AI model called Sentence Transformers (SBERT) to understand both the user’s question and the table names/descriptions.
We used FAISS, a tool designed by Facebook, to find similar matches in large datasets.
we used FastAPI, a lightweight framework to process user queries.


Step 3: Preparing the Database Schema

We stored schema in a file so that our system could read and analyze it.

For example, if our database has tables like Orders and Customers, we describe them in a simple format that includes the table names and their columns.


Step 4: Converting Table Information into AI-Readable Format

We used SBERT to turn these descriptions into numbers called embeddings, which help AI measure how similar two things are.


Step 5: Storing and Searching Efficiently

Once we had AI-generated numbers for all tables, we needed a way to search through them quickly when a user asks a question.

We used FAISS, a tool that speeds up searching by organizing data in a way that makes finding similar items much faster.


Step 6: Building the API
To allow users to interact with the system, we created a FastAPI backend. This backend:

Accepts a user’s query (eg: Find tables related to customer orders).
Converts the query into a format that AI can understand.
Searches for similar tables using FAISS.
Returns the most relevant tables as a response.


Step 7: Running the System
Once everything was set up, we started the backend server. When users send a query, they get a list of the most relevant tables.

if a user asks for customer orders,the system might return:

Orders table with columns like order_id, customer_id, order_date.
Customers table with columns like customer_id, name, email.
Each result has a similarity score to show how confident the system is about the match.


Step 8: Testing the System
We tested the system by asking different queries and checking if the returned tables were valid.

Step 9: Deploying the System
Once everything was working well, we deployed the system online using Vercel, so that it could be accessed by anyone. 
