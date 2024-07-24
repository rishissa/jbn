import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/marquee.js";
const router = Router();
import { createRequest } from "../middlewares/marquee.js";
// Create marquee
router.post("/", [createRequest], create);

// List marquees
router.get("/", [], find);

// List Single marquee
router.get("/:id", [], findOne);

// Update marquees
router.put("/:id", [], update);

// Delete marquee
router.delete("/:id", [], destroy);

export default router;
