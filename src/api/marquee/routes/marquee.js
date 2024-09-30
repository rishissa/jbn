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
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import upload from "../../../../middlewares/upload.js";
// Create marquee
router.post("/", [jwtVerify, upload.array("file", 10)], create);

// List marquees
router.get("/", [jwtVerify], find);

// List Single marquee
router.get("/:id", [jwtVerify], findOne);

// Update marquees
router.put("/:id", [jwtVerify], update);

// Delete marquee
router.delete("/:id", [jwtVerify], destroy);

export default router;
