import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  getAllTags,
} from "../controllers/calendar.js";
const router = Router();
import { createRequest } from "../middlewares/calendar.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
// Create calendar
router.post("/", [jwtVerify, createRequest], create);

// List calendars
router.get("/", [], find);

// List Single calendar
router.get("/tags", [], getAllTags);

router.get("/:id", [], findOne);

// Update calendars
router.put("/:id", [], update);

// Delete calendar
router.delete("/:id", [], destroy);

export default router;
