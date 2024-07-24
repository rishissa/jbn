import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/banner.js";
const router = Router();
import { createRequest } from "../middlewares/banner.js";
import upload from "../../../../middlewares/upload.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
// Create banner
router.post("/", [jwtVerify, upload.array("file", 10)], create);

// List banners
router.get("/", [], find);

// List Single banner
router.get("/:id", [], findOne);

// Update banners
router.put("/:id", [], update);

// Delete banner
router.delete("/:id", [], destroy);

export default router;
