import jwt from "jsonwebtoken";

export const accessToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "Token not provided" });
  }

  token = token.split(" ")[1];

  try {
    const { id, email } = jwt.verify(token, process.env.JWT);

    req.id = id;
    req.email = email;

    next();
  } catch (error) {
    console.log("Error in getJWT", error.message);
    return res
      .status(400)
      .json({ status: "failed", message: "Error credentials" });
  }
};
