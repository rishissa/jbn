import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  fetchTags,
} from "../controllers/gallery.js";
const router = Router();
import { createRequest } from "../middlewares/gallery.js";

import multer from "multer";
import upload from "../../../../middlewares/upload.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";

// Create banner
router.post("/", [jwtVerify, upload.array("files", 10)], create);

// Create gallery
router.post("/", [createRequest], create);

// List gallerys
router.get("/", [], find);

// List Single gallery
router.get("/tags", [], fetchTags);

router.get("/:id", [], findOne);

// Update gallerys
router.put("/:id", [], update);

// Delete gallery
router.delete("/:id", [], destroy);

export default router;
