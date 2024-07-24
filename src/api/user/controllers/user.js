import { getPagination, getMeta, errorResponse } from "rapidjet";
import User from "../models/user.js";
import { jwtSign } from "../../../../services/jwt_sign.js";
import { comparePass, hashPass } from "../../../../services/bcrypt.js";

export const create = async (req, res) => {
  try {
    const hashedPass = await hashPass(req.body.password);
    req.body["password"] = hashedPass;
    const user = new User(req.body);
    await user.save();
    return res.status(200).send({ data: user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const find = async (req, res) => {
  try {
    const query = req.query;
    const pagination = await getPagination(query.pagination);
    const users = await User.find()
      .skip(pagination.offset)
      .limit(pagination.limit);
    const counts = await User.countDocuments({});
    const meta = await getMeta(pagination, counts);
    return res.status(200).send({ data: users, meta });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .send(errorResponse({ status: 404, message: "User not found!" }));
    }
    return res.status(200).send({ data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "User updated!", data: user });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).send(errorResponse({ message: "Invalid ID" }));
    }
    return res.status(200).send({ message: "User deleted!" });
  } catch (error) {
    console.log(error);
    return res.status(500).send(
      errorResponse({
        status: 500,
        message: "Internal Server Error",
        details: error.message,
      })
    );
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "No User Found" }));
    }

    let isMatched = await comparePass(password, user.password);
    if (isMatched) {
      const token = jwtSign(user.id);
      return res.status(200).send({ token, user });
    } else {
      return res
        .status(400)
        .send(errorResponse({ status: 400, message: "Invalid Credentials" }));
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).send(err.message);
  }
};
