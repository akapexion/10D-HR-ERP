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
  const {fullname, email, dept, role, joiningDate } = req.body;
  console.log(req.body);
  try{
    await Employee.insertOne({
      employee_fullname : fullname,
      employee_email : email,
      employee_department : dept,
      employee_role : role,
      employee_joiningDate : joiningDate
    });
    res.send({message : "Employee Added Successfully"});
  }
  catch(err){
    console.log(err);
  }
})


app.get("/employees", async(req, res) => {
  try{
    const employees = await Employee.find();
    res.send({message : "Employees Fetched Successfully", employees});
  }
  catch(err){
    console.log(err);
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});