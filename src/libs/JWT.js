import JWT from "jsonwebtoken";

export const generateToken = (id, email) => {
  const token = JWT.sign({ id, email }, process.env.JWT, { expiresIn: "1d" });
  return token;
};
