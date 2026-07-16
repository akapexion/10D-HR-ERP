import express from 'express';
import connectDB from './config/db_connection.js';
import Employee from './models/employees.js';
const app = express();

connectDB();


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});