# API Configuration

This directory contains the centralized API configuration for the Bria frontend application.

## Files

- `api.js` - Main API configuration with axios instance and endpoints

## Usage

### Basic API Client

```javascript
import apiClient from '../config/api.js';

// Make a request
const response = await apiClient.get('/services');
```

### Using Services

```javascript
import { serviceService } from '../services';

// Get all services
const services = await serviceService.getServices();
```

### Using Hooks

```javascript
import { useServices } from '../hooks';

function ServicesComponent() {
  const { data: services, loading, error } = useServices();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {services?.map(service => (
        <div key={service.id}>{service.name}</div>
      ))}
    </div>
  );
}
```

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_API_BASE_URL=http://localhost:8000
```

## API Endpoints

All endpoints are defined in `API_ENDPOINTS` object in `api.js`. This provides a centralized way to manage all API routes.

## Error Handling

The API client includes:
- Request interceptor for adding auth tokens
- Response interceptor for handling common errors (401 redirects)
- Automatic error logging
