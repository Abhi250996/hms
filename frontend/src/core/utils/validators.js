// src/core/utils/validators.js
export const required = (value) => {
  if (value === undefined || value === null || value === "") {
    return "This field is required";
  }
  return null;
};

export const isEmail = (email) => {
  if (!email) return null;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email) ? null : "Invalid email address";
};

export const isMobile = (mobile) => {
  if (!mobile) return null;
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile) ? null : "Invalid mobile number";
};

export const minLength = (value, length) => {
  if (!value) return null;
  return value.length >= length
    ? null
    : `Minimum ${length} characters required`;
};

export const validateForm = (rules, values) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const validators = rules[field];
    for (let validate of validators) {
      const error = validate(values[field]);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });

  return errors;
};
