import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    // const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, 12);
    return hash;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

export { hashPassword, comparePassword };
