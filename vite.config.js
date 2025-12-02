export default {
  server: {
    proxy: {
      // Proxy frontend /api requests to the backend during development.
      // Make sure your backend runs on the port configured in .env (REACT_APP_BACKEND_URL)
      '/api': 'http://localhost:4000',
    },
  },
};
