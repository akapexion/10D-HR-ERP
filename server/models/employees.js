import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    employee_fullname : {
        type : String,
        required : true
    },
    employee_email : {
        type : String,
        required : true
    },
    employee_role : {
        type : String,
        required : true
    },
    employee_department : {
        type : String,
        required : true
    },
    employee_joiningDate : {
        type : Date,
        required : true
    }
})

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;