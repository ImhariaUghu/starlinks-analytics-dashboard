# Starlinks Global Logistics Analytics Dashboard

A modern React.js frontend application for visualizing logistics data analytics from Starlinks Global's shipment database.

## Features

- 📊 **Interactive Charts**: Bar charts and pie charts using Recharts
- 🔍 **Advanced Filtering**: Filter by carrier, delivery status, and service type
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Built with Bootstrap 5 and Font Awesome icons
- ⚡ **Real-time Data**: Connects to Azure-hosted Flask API
- 📈 **Analytics Dashboard**: Key metrics and insights at a glance

## Analytics Questions Answered

1. **Average cost of shipments by carrier**
2. **Number of delayed shipments in the last 3 months**
3. **Top 5 most expensive shipments**
4. **Distribution of shipment priority by delivery status**
5. **Correlation between weight and cost for Express service type**

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Access to the Starlinks Global Flask API

## Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd starlinks-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure API endpoint**:
   - Open `src/api.js`
   - Update the `API_BASE` constant with your Flask API URL:
   ```javascript
   const API_BASE = "https://your-flask-api.azurewebsites.net";
   ```

## Running the Application

### Development Mode
```bash
npm start
```
The application will open at [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/
│   ├── Dashboard.js      # Main dashboard component
│   ├── Filters.js        # Filter controls
│   ├── Graphs.js         # Chart components
│   └── ShipmentsTable.js # Data table component
├── api.js                # API service functions
├── App.js                # Main app component
├── App.css               # Custom styles
└── index.js              # App entry point
```

## API Endpoints

The frontend connects to the following Flask API endpoints:

- `GET /average-cost-by-carrier` - Average shipping costs by carrier
- `GET /delayed-last-3-months` - Count of delayed shipments
- `GET /top-5-expensive` - Most expensive shipments
- `GET /priority-distribution` - Priority distribution by status
- `GET /express-weight-cost-correlation` - Weight vs cost correlation

## Technologies Used

- **React.js** - Frontend framework
- **Bootstrap 5** - CSS framework for responsive design
- **Recharts** - Chart library for data visualization
- **Axios** - HTTP client for API calls
- **Font Awesome** - Icon library

## Customization

### Adding New Charts
1. Create a new component in `src/components/`
2. Add the API endpoint in `src/api.js`
3. Import and use the component in `Dashboard.js`

### Styling
- Main styles are in `src/App.css`
- Bootstrap classes are used throughout
- Custom CSS can be added to `App.css`

### API Configuration
- Update `API_BASE` in `src/api.js`
- Add error handling for new endpoints
- Test API connectivity before deployment

## Troubleshooting

### Common Issues

1. **Charts not displaying data**:
   - Check browser console for API errors
   - Verify API endpoint is accessible
   - Ensure CORS is enabled on the backend

2. **Build errors**:
   - Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in components

3. **API connection issues**:
   - Verify the API URL in `src/api.js`
   - Check if the Flask API is running
   - Test API endpoints directly in browser

## Deployment

### Azure Static Web Apps
1. Build the application: `npm run build`
2. Deploy the `build` folder to Azure Static Web Apps
3. Configure environment variables if needed

### Other Platforms
- **Netlify**: Connect GitHub repository and set build command
- **Vercel**: Import project and deploy
- **GitHub Pages**: Use `gh-pages` package

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Starlinks Global logistics analytics platform.

## Support

For technical support or questions, please contact the development team or create an issue in the repository.
