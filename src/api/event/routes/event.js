import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/event.js";
const router = Router();
import { createRequest } from "../middlewares/event.js";
import upload from "../../../../middlewares/upload.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
// Create event
router.post("/", [jwtVerify, upload.single("banner_url")], create);

// List events
router.get("/", [jwtVerify], find);

// List Single event
router.get("/:id", [jwtVerify], findOne);

// Update events
router.put("/:id", [jwtVerify, upload.single("banner_url")], update);

// Delete event
router.delete("/:id", [jwtVerify], destroy);

export default router;
