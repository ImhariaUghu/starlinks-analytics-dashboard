import pandas as pd
from azure.cosmos import CosmosClient
import uuid
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# STEP 1: Load your CSV dataset
df = pd.read_csv("logistics_dataset.csv")

# Convert to string where needed
df['ShipmentDate'] = pd.to_datetime(df['ShipmentDate'], errors='coerce').astype(str)
df['DeliveryDate'] = pd.to_datetime(df['DeliveryDate'], errors='coerce').astype(str)

# Azure Cosmos DB connection details (from environment variables)
COSMOS_URI = os.getenv("COSMOS_URI")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("DATABASE_NAME")
CONTAINER_NAME = os.getenv("CONTAINER_NAME")

# Connect to Cosmos DB
client = CosmosClient(COSMOS_URI, credential=COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

# Insert each row
for row in df.to_dict(orient='records'):
    row['id'] = str(row['ShipmentID'])  # Cosmos DB requires "id" field
    if row['DeliveryDate'] == 'NaT':
        row['DeliveryDate'] = None
    container.upsert_item(row)

print("✅ Original dataset uploaded to Cosmos DB.")