// src/middleware/role.middleware.js
module.exports = (requiredRole) => {
  return (req, res, next) => {
    // 1. Check if user exists (set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({ message: "Unauthenticated: No user found" });
    }
    
    // 2. Case-insensitive role check
    if (req.user.role.toUpperCase() !== requiredRole.toUpperCase()) {
      return res.status(403).json({ 
        message: `Access denied. Requires ${requiredRole}, but you are ${req.user.role}` 
      });
    }
    
    next();
  };
};