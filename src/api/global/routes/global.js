import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/global.js";
const router = Router();
import { createRequest } from "../middlewares/global.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
// Create global
router.post("/", [jwtVerify], create);

// List globals
router.get("/", [], find);

// List Single global
router.get("/:id", [], findOne);

// Update globals
router.put("/:id", [], update);

// Delete global
router.delete("/:id", [], destroy);

export default router;
