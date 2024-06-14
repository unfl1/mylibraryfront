const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'http://backend:8080' : '';
export default API_BASE_URL;