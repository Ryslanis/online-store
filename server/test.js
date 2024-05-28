const axios = require('axios');
const fs = require('fs');
const path = require('path');

const formData = new FormData();
formData.append('name', 'Product Name');
formData.append('brandId', '123');
formData.append('typeId', '456');
formData.append('price', '99.99');
formData.append('info', JSON.stringify([
  { title: 'Info 1', description: 'Description 1' },
  { title: 'Info 2', description: 'Description 2' }
]));

const imagePath = path.resolve(__dirname, 'static', 'coffee.webp'); // Replace with the path to your image file
const imageStream = new File(imagePath)

formData.append('img', imageStream);

const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTEsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJyb2xlcyI6WyJBRE1JTiJdLCJjcmVhdGVkQXQiOiIyMDI0LTA1LTI1VDIzOjEyOjI5LjY0OVoiLCJpYXQiOjE3MTY3NTkyMzcsImV4cCI6MTcxNjc2MjgzN30.zLDsdWNMMdV6MCrSj5OWiR7hNXSqhLGGBnNVkFMTAXs';

const config = {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
  }
};

axios.post('http://localhost:5000/api/device', formData, config)
  .then(response => {
    console.log('Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
