import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

// Starlinks Global color scheme
const STARLINKS_COLORS = [
  '#00CED1', // Primary turquoise
  '#008B8B', // Dark turquoise
  '#40E0D0', // Light turquoise
  '#20B2AA', // Sea green
  '#48D1CC'  // Medium turquoise
];

function Graphs({ averageCost, priorityDist, correlation, showAverageCost = true, showPriorityDist = true }) {
  // Check if data exists and has content
  const hasAverageCostData = averageCost && averageCost.length > 0;
  const hasPriorityData = priorityDist && priorityDist.length > 0;

  // Transform priority data for pie chart - group by Priority
  const transformPriorityData = (data) => {
    if (!data || data.length === 0) return [];
    
    const priorityGroups = {};
    data.forEach(item => {
      const priority = item.Priority;
      if (!priorityGroups[priority]) {
        priorityGroups[priority] = 0;
      }
      priorityGroups[priority] += item.Count;
    });
    
    return Object.entries(priorityGroups).map(([priority, count]) => ({
      name: priority,
      value: count
    }));
  };

  const transformedPriorityData = transformPriorityData(priorityDist);

  return (
    <div>
      {showAverageCost && (
        hasAverageCostData ? (
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={averageCost} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="Carrier"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  interval={0}
                  tick={{ fill: '#2C3E50', fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: '#2C3E50', fontSize: 12 }}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Average Cost']}
                  labelStyle={{ color: '#333', fontWeight: 'bold' }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #00CED1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 206, 209, 0.15)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="AvgCost"
                  fill="#00CED1"
                  name="Average Cost (USD)"
                  radius={[4, 4, 0, 0]}
                />
      </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <i className="fas fa-chart-bar fa-3x mb-3" style={{ color: '#00CED1' }}></i>
            <p>No average cost data available</p>
            <small>Check console for API errors</small>
          </div>
        )
      )}

      {showPriorityDist && (
        transformedPriorityData.length > 0 ? (
          <div className="mb-4">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={transformedPriorityData}
          cx="50%"
          cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
                  fill="#00CED1"
                  dataKey="value"
                  nameKey="name"
                >
                  {transformedPriorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STARLINKS_COLORS[index % STARLINKS_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [value, name]}
                  labelStyle={{ color: '#333', fontWeight: 'bold' }}
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '2px solid #00CED1',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(0, 206, 209, 0.15)'
                  }}
                />
                <Legend />
      </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center text-muted py-4">
            <i className="fas fa-chart-pie fa-3x mb-3" style={{ color: '#00CED1' }}></i>
            <p>No priority distribution data available</p>
            <small>Check console for API errors</small>
          </div>
        )
      )}
    </div>
  );
}

export default Graphs;