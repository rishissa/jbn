import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const jwtSign = (payload) => {
  const token = jwt.sign({ id: payload }, JWT_SECRET, { expiresIn: "1d" });
  return token;
};
