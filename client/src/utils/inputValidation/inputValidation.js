function hasMinLength(value, minlength) {
  return value.length >= minlength;
}

function validateEmail(email) {
  const errors = [];

  if (!email.endsWith("@gmail.com")) {
    errors.push("Email must ends with '@gmail.com'.");
  }

  const atCount = (email.match(/@/g) || []).length;
  if (atCount !== 1) {
    errors.push("Email must contain exactly one '@' symbol.");
  }

  if (/\s/.test(email)) {
    errors.push("Email must not contain whitespace.");
  }

  if (!hasMinLength(email, 15)) {
    errors.push("Email must be at least 15 characters long.");
  }

  const gmailCount = (email.match(/@gmail\.com/g) || []).length;
  if (gmailCount > 1) {
    errors.push("Email must not contain multiple '@gmail.com' substrings.");
  }

  return errors;
}

function validatePassword(password) {
  const errors = [];

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must have at least one uppercase letter.");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must have at least one lowercase letter.");
  }

  if (!hasMinLength(password, 6)) {
    errors.push("Password must be at least 6 characters long.");
  }

  return errors;
}

export { validateEmail, validatePassword, hasMinLength };
