import { useState } from "react";
import { UserCircle2, Upload } from "lucide-react";
import axios from "axios";

export default function AddEmployee() {

  const [empFullName, setEmpFullName] = useState("");
  const [empEmail, setEmpEmail] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empDepartment, setEmpDepartment] = useState("Engineering");
  const [empJoinDate, setEmpJoinDate] = useState("");
  
  const handleSubmission = async(e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:3000/addemployee", {
          empFullName,
          empEmail,
          empRole,
          empDepartment,
          empJoinDate
        });

        console.log(response);

        setEmpFullName("");
        setEmpEmail("");
        setEmpRole("");
        setEmpDepartment("Engineering");
        setEmpJoinDate("");
    }
    catch(err){
        console.error(err);
    }
    
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 max-w-2xl">
      <div className="p-5 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Add Employee</h2>
        <p className="text-sm text-slate-500">
          Fill in the details to onboard a new team member
        </p>
      </div>

      <form className="p-6 space-y-6" onSubmit={handleSubmission}>
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <UserCircle2 size={36} />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors"
          >
            <Upload size={15} /> Upload Photo
          </button>
        </div>

        {/* Fields */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Full Name
            </label>
            <input
              name="name"
              placeholder="e.g. Ayesha Khan"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              value={empFullName}
              onChange={(e) => setEmpFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              value={empEmail}
              onChange={(e) => setEmpEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Job Role
            </label>
            <input
              name="role"
              placeholder="e.g. Product Designer"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              value={empRole}
              onChange={(e) => setEmpRole(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Department
            </label>
            <select
              name="department"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              onChange={(e) => setEmpDepartment(e.target.value)}
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Joining Date
            </label>
            <input
              name="joinDate"
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={empJoinDate}
              onChange={(e) => setEmpJoinDate(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}