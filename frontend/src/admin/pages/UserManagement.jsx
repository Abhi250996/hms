// src/admin/pages/UserManagement.jsx
import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import { adminController } from "../controller/admin.controller";
import Loader from "../../shared/components/Loader";
import Input from "../../shared/components/FormControls/Input";
import Select from "../../shared/components/FormControls/Select";

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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const usersRes = await adminController.getUsers();
    const rolesRes = await adminController.getRoles();
    setUsers(usersRes?.data || []);
    setRoles(rolesRes?.data || []);
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await adminController.updateUser(editingId, form);
    } else {
      await adminController.createUser(form);
    }
    setForm(initialForm);
    setEditingId(null);
    loadData();
  };

  const editUser = (u) => {
    setEditingId(u.id);
    setForm({
      staffId: u.staffId,
      name: u.name,
      email: u.email,
      mobile: u.mobile,
      role: u.role,
      designation: u.designation,
      department: u.department,
      password: "",
      status: u.status,
      joiningDate: u.joiningDate,
    });
  };

  const removeUser = async (id) => {
    if (window.confirm("Delete this user?")) {
      await adminController.deleteUser(id);
      loadData();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-1">User Management</h1>
        <p className="text-slate-500 mb-6">
          Create & manage hospital staff accounts
        </p>

        {/* FORM */}
        <form
          onSubmit={submit}
          className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <h3 className="md:col-span-3 font-semibold text-lg">
            {editingId ? "Update User" : "Create User"}
          </h3>

          <Input
            label="Staff ID"
            value={form.staffId}
            onChange={(e) => handleChange("staffId", e.target.value)}
            required
          />

          <Input
            label="Name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
            required
          />

          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />

          <Input
            label="Mobile"
            value={form.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
          />

          <Select
            label="Role"
            value={form.role}
            options={roles.map((r) => ({ label: r, value: r }))}
            onChange={(e) => handleChange("role", e.target.value)}
          />

          <Input
            label="Designation"
            value={form.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
          />

          <Input
            label="Department"
            value={form.department}
            onChange={(e) => handleChange("department", e.target.value)}
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

          <Select
            label="Status"
            value={form.status}
            options={[
              { label: "ACTIVE", value: "ACTIVE" },
              { label: "INACTIVE", value: "INACTIVE" },
            ]}
            onChange={(e) => handleChange("status", e.target.value)}
          />

          <Input
            label="Joining Date"
            type="date"
            value={form.joiningDate}
            onChange={(e) => handleChange("joiningDate", e.target.value)}
          />

          <div className="md:col-span-3 flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={() => {
                setForm(initialForm);
                setEditingId(null);
              }}
              className="px-4 py-2 rounded-lg border"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {editingId ? "Update User" : "Create User"}
            </button>
          </div>
        </form>

        {/* LIST */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">Staff List</h3>

          {loading ? (
            <Loader />
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2">Role</th>
                  <th className="p-2">Department</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b last:border-0 hover:bg-slate-50"
                  >
                    <td className="p-2">{u.name}</td>
                    <td className="p-2 text-center">{u.role}</td>
                    <td className="p-2 text-center">{u.department || "-"}</td>
                    <td className="p-2 text-center">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          u.status === "ACTIVE"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="p-2 text-center space-x-2">
                      <button
                        onClick={() => editUser(u)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeUser(u.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserManagement;
