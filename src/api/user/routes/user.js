import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  login,
} from "../controllers/user.js";
const router = Router();
import { createRequest } from "../middlewares/user.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";

// Create user
router.post("/", [jwtVerify, createRequest], create);

// List users
router.get("/", [jwtVerify], find);

// List Single user
router.get("/:id", [jwtVerify], findOne);

// Update users
router.put("/:id", [jwtVerify], update);

// Delete user
router.delete("/:id", [jwtVerify], destroy);

//Login user
router.post("/login", [], login);

export default router;
