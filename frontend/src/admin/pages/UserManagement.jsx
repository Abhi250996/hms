import { useEffect, useState } from "react";
import { adminController } from "../controller/admin.controller";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/Input";
import Select from "../../shared/components/Select";

const initialForm = {
  staffId: "",
  name: "",
  email: "",
  mobile: "",
  role: "STAFF",
  designation: "",
  department: "",
  password: "",
  status: "ACTIVE",
  joiningDate: "",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔍 Filters
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const usersRes = await adminController.getUsers();
      const rolesRes = await adminController.getRoles();
      setUsers(usersRes?.data || []);
      setRoles(rolesRes?.data || []);
    } catch (error) {
      console.error("Data load error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setEditingId(null);
    setForm(initialForm);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setForm(initialForm);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminController.updateUser(editingId, form);
      } else {
        await adminController.createUser(form);
      }
      handleCloseModal();
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const editUser = (u) => {
    setEditingId(u.id);
    setForm({
      staffId: u.staffId || "",
      name: u.name || "",
      email: u.email || "",
      mobile: u.mobile || "",
      role: u.role || "STAFF",
      designation: u.designation || "",
      department: u.department || "",
      password: "", // Security: never load existing password
      status: u.status || "ACTIVE",
      joiningDate: u.joiningDate ? u.joiningDate.split("T")[0] : "",
    });
    setIsModalOpen(true);
  };

  const removeUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await adminController.deleteUser(id);
      loadData();
    }
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.mobile?.includes(search);
    const matchesRole = filterRole === "ALL" ? true : u.role === filterRole;
    const matchesStatus = filterStatus === "ALL" ? true : u.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm">Create and manage internal hospital staff accounts</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-md shadow-blue-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Add New Staff
        </button>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by name, email, or mobile..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select
          value={filterRole}
          options={[{ label: "All Roles", value: "ALL" }, ...roles.map((r) => ({ label: r, value: r }))]}
          onChange={(e) => setFilterRole(e.target.value)}
        />
        <Select
          value={filterStatus}
          options={[
            { label: "All Status", value: "ALL" },
            { label: "ACTIVE", value: "ACTIVE" },
            { label: "INACTIVE", value: "INACTIVE" },
          ]}
          onChange={(e) => setFilterStatus(e.target.value)}
        />
      </div>

      {/* ================= LIST TABLE ================= */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-slate-50/50 flex justify-between items-center">
          <h3 className="font-bold text-slate-700">Staff Members ({filteredUsers.length})</h3>
        </div>
        {loading ? (
          <div className="p-20 flex justify-center"><Loader /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="p-4 text-left font-semibold">Staff Identity</th>
                  <th className="p-4 text-left font-semibold">Role & Dept</th>
                  <th className="p-4 text-center font-semibold">Status</th>
                  <th className="p-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-12 text-center text-slate-400 italic">No users found matching your criteria.</td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-800">{u.name}</div>
                        <div className="text-xs text-slate-400">{u.staffId} • {u.email}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-blue-600 font-semibold text-xs uppercase tracking-wider">{u.role}</div>
                        <div className="text-slate-500 text-xs">{u.department || "General"}</div>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                          u.status === "ACTIVE" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => editUser(u)} className="text-blue-600 hover:text-blue-800 font-medium px-2">Edit</button>
                        <button onClick={() => removeUser(u.id)} className="text-red-500 hover:text-red-700 font-medium px-2">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ================= FORM DIALOG (MODAL) ================= */}
     {isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    {/* Increased max-width to 5xl and removed max-h constraint to stop internal scrolling if possible */}
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
      
      {/* Modal Header */}
      <div className="p-6 border-b flex justify-between items-center bg-white">
        <h2 className="text-xl font-bold text-slate-800">
          {editingId ? "📝 Update Staff Profile" : "➕ Register New Staff Member"}
        </h2>
        <button 
          onClick={handleCloseModal} 
          className="text-slate-400 hover:text-slate-600 text-3xl font-light leading-none"
        >
          &times;
        </button>
      </div>

      {/* Modal Body - Changed to 3 columns on medium screens to reduce height */}
      <form onSubmit={submit} className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Input label="Staff ID" value={form.staffId} onChange={(e) => handleChange("staffId", e.target.value)} required />
        <Input label="Full Name" value={form.name} onChange={(e) => handleChange("name", e.target.value)} required />
        <Input label="Email" type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
        
        <Input label="Mobile" value={form.mobile} onChange={(e) => handleChange("mobile", e.target.value)} />
        <Select
          label="Role"
          value={form.role}
          options={roles.map((r) => ({ label: r, value: r }))}
          onChange={(e) => handleChange("role", e.target.value)}
          required
        />
        <Input label="Designation" value={form.designation} onChange={(e) => handleChange("designation", e.target.value)} />
        
        <Input label="Department" value={form.department} onChange={(e) => handleChange("department", e.target.value)} />
        <Input label="Joining Date" type="date" value={form.joiningDate} onChange={(e) => handleChange("joiningDate", e.target.value)} />
        <Select
          label="Account Status"
          value={form.status}
          options={[{ label: "ACTIVE", value: "ACTIVE" }, { label: "INACTIVE", value: "INACTIVE" }]}
          onChange={(e) => handleChange("status", e.target.value)}
        />

        {!editingId && (
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
          />
        )}

        {/* Modal Footer - Span across all columns */}
        <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-3 mt-4 pt-6 border-t">
          <button
            type="button"
            onClick={handleCloseModal}
            className="px-6 py-2 rounded-lg border border-slate-200 font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Discard
          </button>
          <button
            type="submit"
            className="px-10 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            {editingId ? "Update User" : "Save Account"}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
};

export default UserManagement;