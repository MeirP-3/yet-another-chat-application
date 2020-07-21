export const apiConfig = {
  BACKEND_HOST: process.env.REACT_APP_BACKEND_HOST || 'http://localhost:8080'
};

console.log(process.env)
console.log('apiConfig:', apiConfig)