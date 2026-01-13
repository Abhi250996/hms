// src/modules/auth/auth.service.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../admin/admin.model");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not configured");
}

/**
 * LOGIN USER
 */
exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  if (user.status !== "ACTIVE") {
    throw new Error("User account is inactive");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: user.id,
      staffId: user.staffId,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      designation: user.designation,
      department: user.department,
      status: user.status,
    },
  };
};

/**
 * REGISTER USER (ADMIN creates staff/users)
 */
exports.registerUser = async ({
  staffId,
  name,
  email,
  mobile,
  role,
  designation,
  department,
  password,
  status = "ACTIVE",
  joiningDate,
}) => {
  if (!staffId || !name || !email || !password || !role) {
    throw new Error("Required fields missing");
  }

  const allowedRoles = ["ADMIN", "DOCTOR", "NURSE", "STAFF"];
  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid role");
  }

  const existingUser = await User.findOne({
    where: { email },
  });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const existingStaff = await User.findOne({
    where: { staffId },
  });
  if (existingStaff) {
    throw new Error("Staff ID already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    staffId,
    name,
    email,
    mobile,
    password: hashedPassword,
    role,
    designation,
    department,
    status,
    joiningDate,
  });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return {
    token,
    user: {
      id: user.id,
      staffId: user.staffId,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      designation: user.designation,
      department: user.department,
      status: user.status,
    },
  };
};

/**
 * GET USER PROFILE
 */
exports.getUserById = async (userId) => {
  const user = await User.findByPk(userId, {
    attributes: [
      "id",
      "staffId",
      "name",
      "email",
      "mobile",
      "role",
      "designation",
      "department",
      "status",
      "joiningDate",
    ],
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
