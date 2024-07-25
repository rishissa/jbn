import JWT from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

export const jwtVerify = (req, res, next) => {
  const authToken = req.headers.authorization?.split("Bearer ")[1];
  if (!authToken) {
    return res.status(400).json({ message: "JWT Malformed or Invalid Token" });
  }
  if (typeof authToken === "string") {
    const data = JWT.verify(authToken, JWT_SECRET);

    res.locals.user_id = data.id;
    next();
  } else {
    return res.status(401).json({ message: "UnAuthorized" });
  }
};
