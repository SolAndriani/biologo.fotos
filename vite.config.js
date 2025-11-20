export default {
  server: {
    proxy: {
      '/api': 'http://localhost:000', // <-- el puerto del backend
    },
  },
};
