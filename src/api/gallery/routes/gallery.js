import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/gallery.js";
const router = Router();
import { createRequest } from "../middlewares/gallery.js";
// Create gallery
router.post("/", [createRequest], create);

// List gallerys
router.get("/", [], find);

// List Single gallery
router.get("/:id", [], findOne);

// Update gallerys
router.put("/:id", [], update);

// Delete gallery
router.delete("/:id", [], destroy);

export default router;
