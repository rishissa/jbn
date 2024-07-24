import { Router } from "express";
import { create, find, update, destroy, findOne, login } from "../controllers/user.js";
const router = Router();
import { createRequest } from "../middlewares/user.js";
// Create user
router.post("/", [createRequest], create);

// List users
router.get("/", [], find);

// List Single user
router.get("/:id", [], findOne);

// Update users
router.put("/:id", [], update);

// Delete user
router.delete("/:id", [], destroy);

//Login user
router.post("/login", [], login);

export default router;
