import bcrypt from "bcryptjs";

export const hashPass = (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePass = async (input_password, user_password) => {
  if (await bcrypt.compare(input_password, user_password)) {
    return true;
  }
  return false;
};
