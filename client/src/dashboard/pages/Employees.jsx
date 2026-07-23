import { useState } from "react";
import { Search, MoreVertical, Mail, Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  "On Leave": "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-500 ring-1 ring-slate-200",
};

export default function Employees() {
  const [query, setQuery] = useState("");
  const [empData, setEmpData] = useState([]);

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
  }, []);

  return (
    <div className="">

      Table
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 uppercase text-xs tracking-wide">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>

            {empData.map((emp) => (
              <tr
                key={emp.employee_email}
                className="border-t border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={emp.avatar}
                      alt={emp.employee_fullname}
                      className="w-9 h-9 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-slate-800">{emp.employee_fullname}</p>
                      <p className="text-slate-400 text-xs flex items-center gap-1">
                        <Mail size={12} /> {emp.employee_email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-slate-600">
                  {emp.department}
                  <p className="text-xs text-slate-400">{emp.employee_role}</p>
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[emp.employee_department]}`}
                  >
                    {emp.employee_department}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1 text-slate-400">
                    <button className="p-1.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                      <Pencil size={15} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-slate-100 transition-colors">
                      <MoreVertical size={15} />
                    </button>
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