import { genSalt, hash, compare } from "bcryptjs";

export const encriptPassword = async (password) => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
};

export const verifyPassword = async (password, hash) => {
  const decrypt = await compare(password, hash);
  return decrypt;
};
