# 🌍 Starlinks Global Logistics Analytics Dashboard

A full-stack data analytics dashboard for visualizing Starlinks Global's logistics KPIs. Built with **React.js** for the frontend and a **Flask API** backend deployed to **Azure**, with data stored in **Cosmos DB**.

---

## 📁 Project Structure

```
SLG/
├── frontend/              # React app
├── app.py                 # Flask API
├── requirements.txt       # Backend dependencies
├── upload_to_cosmos.py    # Script to load data into Cosmos DB
├── logistics_dataset.csv  # CSV dataset (original data)
├── .env                   # Environment variables (not committed)
├── .gitignore
```

---

## ⚙️ Features

- 📊 **Interactive dashboard** with Recharts (bar & pie)
- 🧠 **Real-time data querying** from Azure Cosmos DB
- ⚡ **Azure-hosted Flask API**
- ☁️ **Frontend deployed via Azure Static Web Apps**
- 🔐 Secrets managed with `.env` and Azure App Settings
- 📈 5 business questions answered with visual insights

---

## 🔍 Key Analytics Answered

1. **Average cost of shipments by carrier**
2. **Number of delayed shipments in the last 3 months**
3. **Top 5 most expensive shipments**
4. **Priority distribution by delivery status**
5. **Correlation between weight and cost (Express service)**

---

## 🚀 Live Deployment Details

- **Frontend (React)**: Deployed to Azure Static Web Apps  

- **Backend (Flask API)**: Deployed to Azure App Service  
  [🔗 API Endpoint](https://slg-flask-api.azurewebsites.net)

- **Database**: Azure Cosmos DB (NoSQL)  
  - Contains one container with shipment records
  - Populated via `upload_to_cosmos.py`

---

## 🧠 Setup Instructions

### 🔧 Backend Setup (Flask API)

```bash
# 1. Create virtual environment
python -m venv .venv
source .venv/bin/activate  # or .venv\Scripts\activate on Windows

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create a .env file with:
COSMOS_URI=your-cosmos-uri
COSMOS_KEY=your-cosmos-key
DATABASE_NAME=your-db
CONTAINER_NAME=your-container

# 4. Run the API
python app.py
```

### 🌐 Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Update the `API_BASE` in `frontend/src/api.js` to your backend URL.

---

## 🛠️ Cosmos DB Import

To upload the CSV data into Cosmos DB:

```bash
python upload_to_cosmos.py
```

- Converts dates to ISO strings
- Assigns `id` based on `ShipmentID`
- Skips invalid/null entries safely


---

## 📦 Tech Stack

- **Frontend**: React, Bootstrap 5, Recharts, Axios
- **Backend**: Flask, Azure Cosmos SDK
- **Deployment**: Azure App Service, Azure Static Web Apps
- **Database**: Azure Cosmos DB (NoSQL)
- **Auth/Secrets**: .env + Azure App Configuration


---