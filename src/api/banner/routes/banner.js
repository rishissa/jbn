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
// Create banner
router.post("/api/banners", [upload.array("file", 10)], create);

// List banners
router.get("/api/banners", [], find);

// List Single banner
router.get("/api/banners/:id", [], findOne);

// Update banners
router.put("/api/banners/:id", [], update);

// Delete banner
router.delete("/api/banners/:id", [], destroy);

export default router;
