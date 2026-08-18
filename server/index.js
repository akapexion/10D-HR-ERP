import express from 'express';
import connectDB from './config/db_connection.js';
import Employee from './models/employees.js';
import cors from 'cors';
import bcrypt from 'bcrypt';
import Auth from './models/auth.js';
import upload from './middlewares/uploadMiddleware.js';
const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post("/addemployee", upload.single("image"), async(req, res) => {
  const {fullname, email, dept, role, joiningDate } = req.body;
  console.log(req.body);
  console.log(req.file);
  try{
    await Employee.insertOne({
      employee_fullname : fullname,
      employee_email : email,
      employee_department : dept,
      employee_role : role,
      employee_joiningDate : joiningDate,
      employee_image : req.file.filename
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

    console.log("Updated");

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



app.post("/register", async(req, res) => {
  try{

    const { full_name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);


    await Auth.insertOne({
      full_name : full_name,
      email : email,
      password : hashPassword
    });

    res.send({message : "User Registered Successfully"});
  }
  catch(err){
    console.log(err);
  }
})


app.post("/login", async(req, res) => {
  try{
    const {email, password} = req.body;

    const registeredAuth = await Auth.findOne({email : email});
    if(registeredAuth){
      const isMatch = await bcrypt.compare(password, registeredAuth.password);
      if(isMatch){
        res.send({message : "Logged in Successfully"});
      }
      else {
        res.send({message : "Incorrect Credentials"});
      }
    }
    else {
      res.send({message : "Auth don't exist"});
    }
  }
  catch(err){
    console.log(err);
  }
})























app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});