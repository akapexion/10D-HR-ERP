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

app.get("/employees", async(req, res) => {
  try{
    const employees = await Employee.find();
    res.send({message : "Employees fetched successfully", employees});
  }
  catch(err){
    console.log(err);
  }
})

app.put("/updateemployee/:id", async(req, res) => {
  try{
    // console.log(req.body);
    const { editEmpName, editEmpEmail, editEmpDept } = req.body;
    await Employee.updateOne({_id : req.params.id}, {$set : {
      employee_fullname : editEmpName,
      employee_email : editEmpEmail,
      employee_dept : editEmpDept
    }});
    res.send({message : "Employee Updated successfully"});
  }
  catch(err){
    console.log(err);
  }
})


app.delete("/deleteemployee/:id", async(req, res) => {
  try{
    await Employee.deleteOne({_id : req.params.id});
    res.send({message : "Employee deleted successfully"});
  }
  catch(err){
    console.log(err);
  }
})


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});