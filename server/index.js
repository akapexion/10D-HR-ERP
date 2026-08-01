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



app.put("/updateemployee/:id", async(req, res) => {
  try{
    await Employee.updateOne({_id : req.params.id}, {$set : {
      employee_fullname : req.body.editEmpName,
      employee_email : req.body.editEmpEmail,
      employee_department : req.body.editEmpDept
    }});

    res.send({message : "Employee Updated Successfully"});
  }
  catch(err){
    console.log(err);
  }
})

app.delete("/deleteemployee/:id", async(req, res) => {
  try{
    await Employee.deleteOne({_id : req.params.id});
    res.send({message : "Employee deleted Successfully"});
  }
  catch(err){
    console.log(err);
  }
})
















app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});