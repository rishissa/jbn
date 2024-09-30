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
router.get("/", [jwtVerify], find);

// List Single calendar
router.get("/tags", [jwtVerify], getAllTags);

router.get("/:id", [jwtVerify], findOne);

// Update calendars
router.put("/:id", [jwtVerify], update);

// Delete calendar
router.delete("/:id", [jwtVerify], destroy);

export default router;
