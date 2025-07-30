import axios from "axios";

const API_BASE = "http://slg-flask-api.azurewebsites.net"; 
// Temporary CORS proxy for testing (remove after Azure deployment)
// const API_BASE = "https://cors-anywhere.herokuapp.com/http://slg-flask-api.azurewebsites.net";

export const getAverageCostByCarrier = () =>
  axios.get(`${API_BASE}/average-cost-by-carrier`)
    .then(res => {
      console.log("Average cost data received:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Error fetching average cost by carrier:", error);
      console.error("Error details:", error.response?.data || error.message);
      return [];
    });

export const getDelayedLast3Months = () =>
  axios.get(`${API_BASE}/delayed-last-3-months`)
    .then(res => {
      console.log("Delayed shipments data received:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Error fetching delayed shipments:", error);
      console.error("Error details:", error.response?.data || error.message);
      return { delayed_count: 0 };
    });

export const getTop5Expensive = () =>
  axios.get(`${API_BASE}/top-5-expensive`)
    .then(res => {
      console.log("Top 5 expensive data received:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Error fetching top 5 expensive:", error);
      console.error("Error details:", error.response?.data || error.message);
      return [];
    });

export const getPriorityDistribution = () =>
  axios.get(`${API_BASE}/priority-distribution`)
    .then(res => {
      console.log("Priority distribution data received:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Error fetching priority distribution:", error);
      console.error("Error details:", error.response?.data || error.message);
      return [];
    });

export const getExpressCorrelation = () =>
  axios.get(`${API_BASE}/express-weight-cost-correlation`)
    .then(res => {
      console.log("Correlation data received:", res.data);
      return res.data;
    })
    .catch(error => {
      console.error("Error fetching correlation:", error);
      console.error("Error details:", error.response?.data || error.message);
      return { correlation: null };
    });