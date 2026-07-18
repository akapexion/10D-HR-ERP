import express from 'express';
import connectDB from './config/db_connection.js';
import Employee from './models/employees.js';
import cors from 'cors';
const app = express();

connectDB();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post("/addemployee", async(req, res) => {
  try{
    const { empFullName, empEmail, empRole, empDepartment, empJoinDate } = req.body;

    await Employee.insertOne({
      employee_fullname : empFullName,
      employee_email : empEmail,
      employee_role : empRole,
      employee_department : empDepartment,
      employee_joiningDate : empJoinDate
    });
    res.send({message : "Employee added successfully"});
  }
  catch(err){
    console.log(err);
  }
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});