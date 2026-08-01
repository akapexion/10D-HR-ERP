import { useState } from "react";
import { Search, MoreVertical, Mail, Pencil, Trash2, Check, X } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  "On Leave": "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

export default function Employees() {

  const [empData, setEmpData] = useState([]);
  const [editingID, setEditingID] = useState(null);
  const [editEmpName, setEditEmpName] = useState("");
  const [editEmpEmail, setEditEmpEmail] = useState("");
  const [editEmpDept, setEditEmpDept] = useState("");
  
  const [refresh, setRefresh] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employees");

      console.log(response.data.employees);
      setEmpData(response.data.employees);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, [refresh]);

  const handleEdit = (emp) => {
    setEditingID(emp._id);
    setEditEmpName(emp.employee_fullname);
    setEditEmpEmail(emp.employee_email);
    setEditEmpDept(emp.employee_department);
  }

  const handleSave = async(id) => {
    try{
      const response = await axios.put(`http://localhost:3000/updateemployee/${id}`, {
        editEmpName,
        editEmpEmail,
        editEmpDept
      });

      console.log(response);
      setEditingID(null);
      setRefresh(!refresh);
    }
    catch(err){
      console.log(err);
    }
  }

  const handleDelete = async(id) => {
    try{
      const response = await axios.delete(`http://localhost:3000/deleteemployee/${id}`);

      console.log(response);
      setRefresh(!refresh);
    }
    catch(err){
      console.log(err);
    }
  } 







  return (
    <div className="">

      Table
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 uppercase text-xs tracking-wide">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {empData.map((emp) => (
              <tr
                key={emp._id}
                className="border-t border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src=""
                      alt=""
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-slate-800">
                        {
                          editingID == emp._id ?
                            <input type="text" className="border border-gray-300 p-2" value={editEmpName} onChange={(e) => setEditEmpName(e.target.value)} />
                            :
                            emp.employee_fullname

                        }
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600">
                  {
                    editingID == emp._id ?
                      <input type="text" className="border border-gray-300 p-2" value={editEmpEmail} onChange={(e) => setEditEmpEmail(e.target.value)} />
                      :
                      emp.employee_email
                  }
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium`}
                  >
                    {
                      editingID == emp._id ?
                        <select
                          name="department"
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                          onChange={(e) => setEditEmpDept(e.target.value)}
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Human Resources">Human Resources</option>
                          <option value="Sales">Sales</option>
                        </select>
                        :
                        emp.employee_department

                    }
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1 text-slate-400">

                    {editingID == emp._id ? 
                    <>
                    <button onClick={() => handleSave(emp._id)} className="p-1.5 rounded-md bg-green-600 text-white">
                      <Check size={15} />
                    </button>

                    <button onClick={() => setEditingID(null)} className="p-1.5 rounded-md bg-yellow-600 text-white">
                      <X size={15} />
                    </button>  
                    </>
                    :
                    <>
                    <button onClick={() => handleEdit(emp)} className="p-1.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Pencil size={15} />
                    </button>

                    <button onClick={() => handleDelete(emp._id)} className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                    </>
                  }
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}