import { useState, useRef } from "react";
import { UserCircle2, Upload, Mail, Briefcase, Building2, CalendarDays, X, Loader2 } from "lucide-react";
import axios from "axios";

export default function AddEmployee() {

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dept, setDept] = useState("Marketing");
  const [role, setRole] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const clearImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {

      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("email", email);
      formData.append("dept", dept);
      formData.append("role", role);
      formData.append("joiningDate", joiningDate);
      formData.append("image", image);

      const response = await axios.post("http://localhost:3000/addemployee", formData);

      console.log(response);

      setFullName("");
      setEmail("");
      setDept("");
      setRole("");
      setJoiningDate("");
      clearImage();
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setSubmitting(false);
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

      <form className="p-6 space-y-6" onSubmit={handleSubmission} encType="multipart/form-data">
        {/* Avatar upload */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 overflow-hidden ring-1 ring-slate-200">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <UserCircle2 size={36} />
            )}
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="employee-image"
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 border border-indigo-200 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
            >
              <Upload size={15} />
              {imagePreview ? "Change photo" : "Upload photo"}
            </label>
            <input
              id="employee-image"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            {imagePreview && (
              <button
                type="button"
                onClick={clearImage}
                className="flex items-center gap-1 text-sm font-medium text-slate-500 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <X size={15} />
                Remove
              </button>
            )}
          </div>
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
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              required
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Job Role
            </label>
            <div className="relative">
              <Briefcase size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="role"
                placeholder="e.g. Product Designer"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Department
            </label>
            <div className="relative">
              <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <select
                name="department"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors appearance-none"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-600 mb-1.5">
              Joining Date
            </label>
            <div className="relative sm:max-w-[calc(50%-0.625rem)]">
              <CalendarDays size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="joinDate"
                type="date"
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Adding..." : "Add Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}