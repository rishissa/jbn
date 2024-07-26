import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/member.js";
const router = Router();
import { createRequest } from "../middlewares/member.js";
// Create member
router.post("/", [createRequest], create);

// List members
router.get("/", [], find);

// List Single member
router.get("/:id", [], findOne);

// Update members
router.put("/:id", [], update);

// Delete member
router.delete("/:id", [], destroy);

export default router;
