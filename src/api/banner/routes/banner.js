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
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";

import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const uploadFields = upload.fields([
  { name: "desktop", maxCount: 1 },
  { name: "mobile", maxCount: 1 },
]);
// Create banner
router.post("/", [jwtVerify, uploadFields], create);

// List banners
router.get("/", [], find);

// List Single banner
router.get("/:id", [], findOne);

// Update banners
router.put("/:id", [], update);

// Delete banner
router.delete("/:id", [], destroy);

export default router;
