from flask import Flask, jsonify
from flask_cors import CORS
from azure.cosmos import CosmosClient
from datetime import datetime, timedelta
import numpy as np
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Setup Flask app
app = Flask(__name__)

# Configure CORS to allow requests from React app
CORS(app, origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000"
])

# Cosmos DB credentials (from environment variables)
COSMOS_URI = os.getenv("COSMOS_URI")
COSMOS_KEY = os.getenv("COSMOS_KEY")
DATABASE_NAME = os.getenv("DATABASE_NAME")
CONTAINER_NAME = os.getenv("CONTAINER_NAME")

# Validate that all required environment variables are set
if not all([COSMOS_URI, COSMOS_KEY, DATABASE_NAME, CONTAINER_NAME]):
    raise ValueError("Missing required environment variables. Please check your .env file.")

# Connect to Cosmos DB
client = CosmosClient(COSMOS_URI, credential=COSMOS_KEY)
database = client.get_database_client(DATABASE_NAME)
container = database.get_container_client(CONTAINER_NAME)

# Home route (just for testing)
@app.route("/")
def home():
    return {"message": "API is working!"}

# CORS test endpoint
@app.route("/cors-test")
def cors_test():
    return {"message": "CORS is working!", "status": "success"}

# ✅ Q1: Average cost by carrier
@app.route("/average-cost-by-carrier")
def average_cost_by_carrier():
    query_carriers = "SELECT DISTINCT VALUE c.Carrier FROM c"
    carriers = list(container.query_items(query=query_carriers, enable_cross_partition_query=True))

    results = []
    for carrier in carriers:
        query = f"""
        SELECT VALUE AVG(c.CostUSD)
        FROM c
        WHERE c.Carrier = '{carrier}'
        """
        avg_result = list(container.query_items(query=query, enable_cross_partition_query=True))
        avg_cost = avg_result[0] if avg_result else None
        results.append({"Carrier": carrier, "AvgCost": avg_cost})
    
    return jsonify(results)

# ✅ Q2: Delayed shipments in last 3 months
@app.route("/delayed-last-3-months")
def delayed_last_3_months():
    cutoff = (datetime.utcnow() - timedelta(days=90)).strftime('%Y-%m-%d')
    query = f"""
    SELECT VALUE COUNT(1)
    FROM c
    WHERE c.DeliveryStatus = 'Delayed' AND c.ShipmentDate >= '{cutoff}'
    """
    results = list(container.query_items(query=query, enable_cross_partition_query=True))
    return jsonify({"delayed_count": results[0]})

# ✅ Q3: Top 5 most expensive shipments
@app.route("/top-5-expensive")
def top_5_expensive():
    query = """
    SELECT c.ShipmentID, c.CostUSD, c.Carrier
    FROM c
    ORDER BY c.CostUSD DESC
    OFFSET 0 LIMIT 5
    """
    results = list(container.query_items(query=query, enable_cross_partition_query=True))
    return jsonify(results)

# ✅ Q4: Priority distribution by delivery status
@app.route("/priority-distribution")
def priority_distribution():
    # Step 1: Get all distinct combinations of status and priority
    group_query = """
    SELECT DISTINCT VALUE {
        status: c.DeliveryStatus,
        priority: c.Priority
    }
    FROM c
    """
    groups = list(container.query_items(query=group_query, enable_cross_partition_query=True))

    # Step 2: For each combination, count matching records
    results = []
    for group in groups:
        status = group["status"]
        priority = group["priority"]

        count_query = f"""
        SELECT VALUE COUNT(1)
        FROM c
        WHERE c.DeliveryStatus = '{status}' AND c.Priority = '{priority}'
        """
        count_result = list(container.query_items(query=count_query, enable_cross_partition_query=True))
        count = count_result[0] if count_result else 0

        results.append({
            "DeliveryStatus": status,
            "Priority": priority,
            "Count": count
        })

    return jsonify(results)


# ✅ Q5: Correlation (weight vs. cost for Express)
@app.route("/express-weight-cost-correlation")
def express_correlation():
    query = """
    SELECT c.WeightKG, c.CostUSD
    FROM c
    WHERE c.ServiceType = 'Express'
    """
    items = list(container.query_items(query=query, enable_cross_partition_query=True))
    weights = [i['WeightKG'] for i in items if 'WeightKG' in i and 'CostUSD' in i]
    costs = [i['CostUSD'] for i in items if 'WeightKG' in i and 'CostUSD' in i]
    if len(weights) < 2:
        return jsonify({"correlation": None})
    correlation = np.corrcoef(weights, costs)[0, 1]
    return jsonify({"correlation": round(correlation, 4)})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
