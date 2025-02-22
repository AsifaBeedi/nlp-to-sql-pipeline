from sentence_transformers import SentenceTransformer
import json
import yaml
import faiss
import numpy as np

def load_schema(file_path):
    """Load schema from JSON or YAML file."""
    if file_path.endswith(".json"):
        with open(file_path, "r") as f:
            return json.load(f)
    elif file_path.endswith(".yaml") or file_path.endswith(".yml"):
        with open(file_path, "r") as f:
            return yaml.safe_load(f)
    else:
        raise ValueError("Unsupported file format. Use JSON or YAML.")

# Step 1: Load SBERT model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Step 2: Load schema from JSON or YAML
schema_data = load_schema("schema.yaml")  # Change to "schema.json" if using JSON

# Step 3: Convert table names & columns to embeddings
table_embeddings = []
table_descriptions = []

for table in schema_data:
    # Create a description string for each table
    table_desc = f"{table['name']} - {', '.join(table['columns'])}"
    
    # Generate embedding for the description
    embedding = model.encode(table_desc, convert_to_numpy=True)
    
    # Store the embedding and table description
    table_embeddings.append(embedding)
    table_descriptions.append(table_desc)

# Step 4: Convert embeddings to a numpy array
table_embeddings = np.array(table_embeddings, dtype="float32")

# Step 5: Create a FAISS index
index = faiss.IndexFlatL2(table_embeddings.shape[1])  
index.add(table_embeddings)

# Step 6: Save the FAISS index and table descriptions
faiss.write_index(index, "schema_index.faiss")
with open("table_descriptions.json", "w") as f:
    json.dump(table_descriptions, f)

print("Preprocessing complete! FAISS index and table descriptions saved.")