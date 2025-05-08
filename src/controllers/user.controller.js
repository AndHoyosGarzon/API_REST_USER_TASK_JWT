import { validateDataUser, validatePartialUser } from "../libs/userSchema.js"; //import schema validation data user
import { encriptPassword, verifyPassword } from "../libs/encrypt.js";
import {
  createUserDb,
  deleteOneUser,
  findOneEmailUser,
  updateDataUser,
} from "../models/user.model.js";
import { generateToken } from "../libs/JWT.js";

export const registerUser = async (req, res) => {
  try {
    const validate = validateDataUser(req.body);

    if (validate.error) {
      return res.status(400).json({
        status: "failed",
        message: JSON.parse(validate.error.message),
      });
    }

    const findUser = await findOneEmailUser(req.body.email);

    if (findUser) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exists" });
    }

    const hashedPassword = await encriptPassword(req.body.password);

    const createOneUserDb = await createUserDb(
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashedPassword
    );

    const token = generateToken(createOneUserDb.userid, createOneUserDb.email);

    return res.status(201).json({
      status: "success",
      message: "User successfully registered",
      accessToken: token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (email !== req.email) {
      return res.status(400).json({ status: "failed", message: "Email error" });
    }

    const findUser = await findOneEmailUser(req.email);

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    const comparePassword = await verifyPassword(password, findUser.password);

    if (!comparePassword) {
      return res
        .status(401)
        .json({ status: "failed", message: "Error password is not match" });
    }

    const token = generateToken(req.id, req.email);

    return res.status(200).json({
      status: "success",
      message: "Login user successfully",
      dataUser: {
        userId: req.id,
        email: req.email,
        username: `${findUser.firstname} ${findUser.lastname} `,
        token,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.id;
  const email = req.email;
  const validate = validatePartialUser(req.body);

  if (validate.error) {
    return res.status(400).json({
      status: "failed",
      message: JSON.parse(validate.error.message),
    });
  }

  const { firstname, lastname, password } = req.body;

  try {
    const findUser = await findOneEmailUser(email);

    if (!findUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    const newHashPassword = await encriptPassword(password);

    const updateUser = await updateDataUser(
      firstname,
      lastname,
      newHashPassword,
      id,
      email
    );

    if (!updateUser) {
      return res
        .status(400)
        .json({ status: "failed", message: "Error updating data user" });
    }

    return res.status(214).json({
      status: "success",
      message: "User update successfully",
      newDataUser: updateUser,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.id;
  const email = req.email;
  try {
    const findAndDeleteOneUser = await deleteOneUser(id, email);

    if (findAndDeleteOneUser < 1) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }

    return res.status(200).json({
      status: "success",
      message: "Delete data user successfully",
      userId: id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "Failed", message: "Internal server error" });
  }
};
