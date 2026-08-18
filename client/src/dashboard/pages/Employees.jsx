import { useState, useEffect, useMemo } from "react";
import { Search, Mail, Pencil, Trash2, Check, X, Users } from "lucide-react";
import axios from "axios";

const deptStyles = {
  Engineering: "bg-indigo-50 text-indigo-600 ring-1 ring-indigo-200",
  Design: "bg-fuchsia-50 text-fuchsia-600 ring-1 ring-fuchsia-200",
  Marketing: "bg-amber-50 text-amber-600 ring-1 ring-amber-200",
  "Human Resources": "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  Sales: "bg-sky-50 text-sky-600 ring-1 ring-sky-200",
};

const avatarPalette = [
  "bg-indigo-100 text-indigo-600",
  "bg-fuchsia-100 text-fuchsia-600",
  "bg-amber-100 text-amber-600",
  "bg-emerald-100 text-emerald-600",
  "bg-sky-100 text-sky-600",
  "bg-rose-100 text-rose-600",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "?";

const getAvatarColor = (name = "") => {
  const sum = name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return avatarPalette[sum % avatarPalette.length];
};

export default function Employees() {

  const [empData, setEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editingID, setEditingID] = useState(null);
  const [editEmpName, setEditEmpName] = useState("");
  const [editEmpEmail, setEditEmpEmail] = useState("");
  const [editEmpDept, setEditEmpDept] = useState("");

  const [refresh, setRefresh] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/employees");

      console.log(response.data.employees);
      setEmpData(response.data.employees);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
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

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/updateemployee/${id}`, {
        editEmpName,
        editEmpEmail,
        editEmpDept
      });

      console.log(response);
      setEditingID(null);
      setRefresh(!refresh);
    }
    catch (err) {
      console.log(err);
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/deleteemployee/${id}`);

      console.log(response);
      setRefresh(!refresh);
    }
    catch (err) {
      console.log(err);
    }
  }

  const filteredEmpData = useMemo(() => {
    if (!search.trim()) return empData;
    const q = search.toLowerCase();
    return empData.filter(
      (emp) =>
        emp.employee_fullname?.toLowerCase().includes(q) ||
        emp.employee_email?.toLowerCase().includes(q) ||
        emp.employee_department?.toLowerCase().includes(q)
    );
  }, [empData, search]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-slate-200">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">Employees</h2>
          <p className="text-sm text-slate-500">
            {loading ? "Loading team..." : `${filteredEmpData.length} of ${empData.length} team members`}
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees..."
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 uppercase text-xs tracking-wide bg-slate-50/80">
              <th className="px-5 py-3 font-medium">Employee</th>
              <th className="px-5 py-3 font-medium">Email</th>
              <th className="px-5 py-3 font-medium">Department</th>
              <th className="px-5 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              [...Array(4)].map((_, i) => (
                <tr key={i} className="border-t border-slate-100">
                  <td className="px-5 py-4"><div className="h-8 w-40 bg-slate-100 rounded-md animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-4 w-36 bg-slate-100 rounded-md animate-pulse" /></td>
                  <td className="px-5 py-4"><div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse" /></td>
                  <td className="px-5 py-4" />
                </tr>
              ))
            )}

            {!loading && filteredEmpData.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-14 text-center">
                  <div className="flex flex-col items-center gap-2 text-slate-400">
                    <Users size={28} className="text-slate-300" />
                    <p className="text-sm font-medium text-slate-500">
                      {empData.length === 0 ? "No employees yet" : "No matches found"}
                    </p>
                    <p className="text-xs text-slate-400">
                      {empData.length === 0
                        ? "Add your first team member to get started"
                        : "Try a different search term"}
                    </p>
                  </div>
                </td>
              </tr>
            )}

            {!loading && filteredEmpData.map((emp) => (
              <tr
                key={emp._id}
                className="border-t border-slate-100 hover:bg-slate-50/70 transition-colors"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${getAvatarColor(
                        emp.employee_fullname
                      )}`}
                    >
                      {getInitials(emp.employee_fullname)}
                    </div>
                    <div>
                      {editingID == emp._id ? (
                        <input
                          type="text"
                          autoFocus
                          className="border border-slate-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          value={editEmpName}
                          onChange={(e) => setEditEmpName(e.target.value)}
                        />
                      ) : (
                        <p className="font-medium text-slate-800">{emp.employee_fullname}</p>
                      )}
                    </div>
                  </div>
                </td>

                <td className="px-5 py-3 text-slate-600">
                  {editingID == emp._id ? (
                    <input
                      type="text"
                      className="border border-slate-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      value={editEmpEmail}
                      onChange={(e) => setEditEmpEmail(e.target.value)}
                    />
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <Mail size={13} className="text-slate-400" />
                      {emp.employee_email}
                    </span>
                  )}
                </td>

                <td className="px-5 py-3">
                  {editingID == emp._id ? (
                    <select
                      name="department"
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      value={editEmpDept}
                      onChange={(e) => setEditEmpDept(e.target.value)}
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${deptStyles[emp.employee_department] ||
                        "bg-slate-100 text-slate-500 ring-1 ring-slate-200"
                        }`}
                    >
                      {emp.employee_department}
                    </span>
                  )}
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1 text-slate-400">
                    {editingID == emp._id ? (
                      <>
                        <button
                          onClick={() => handleSave(emp._id)}
                          className="p-1.5 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                          title="Save"
                        >
                          <Check size={15} />
                        </button>
                        <button
                          onClick={() => setEditingID(null)}
                          className="p-1.5 rounded-md bg-slate-400 text-white hover:bg-slate-500 transition-colors"
                          title="Cancel"
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="p-1.5 rounded-md hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                          title="Edit"
                        >
                          <Pencil size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(emp._id)}
                          className="p-1.5 rounded-md hover:bg-red-50 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </>
                    )}
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