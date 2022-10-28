export function validateEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

export function validatePassword(password) {
  const minLengthPass = 6;
  return password.length >= minLengthPass;
}

export function validateUsername(username) {
  const minLengthUsername = 12;
  return username.length >= minLengthUsername;
}
