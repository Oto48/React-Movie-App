const validator = require("validator");

// Validation function for username
function isValidUsername(username) {
  return (
    validator.isLength(username, { min: 3 }) && validator.isAlpha(username[0])
  );
}

// Validation function for email
function isValidEmail(email) {
  return validator.isEmail(email);
}

// Validation function for password
function isValidPassword(password) {
  return validator.isLength(password, { min: 3 });
}

module.exports = {
  isValidUsername,
  isValidEmail,
  isValidPassword,
};
