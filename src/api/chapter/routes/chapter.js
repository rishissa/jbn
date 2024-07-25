import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/chapter.js";
const router = Router();
import { createRequest } from "../middlewares/chapter.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import upload from "../../../../middlewares/upload.js";
// Create chapter
router.post("/", [jwtVerify, upload.single("banner_url")], create);

// List chapters
router.get("/", [], find);

// List Single chapter
router.get("/:id", [], findOne);

// Update chapters
router.put("/:id", [jwtVerify, upload.single("banner_url")], update);

// Delete chapter
router.delete("/:id", [jwtVerify], destroy);

export default router;
