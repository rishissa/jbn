import { Router } from "express";
import { create, find, update, destroy } from "../controllers/global.js";
const router = Router();
import { createRequest } from "../middlewares/global.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const uploadFields = upload.fields([
  { name: "light_brand_logo_url", maxCount: 1 },
  { name: "dark_brand_logo_url", maxCount: 1 },
  { name: "favicon_url", maxCount: 1 },
]);

// Create global
router.post("/", [jwtVerify], create);

// List globals
router.get("/", [jwtVerify], find);

// Update globals
router.put("/", [jwtVerify, uploadFields], update);

// Delete global
router.delete("/:id", [jwtVerify], destroy);

export default router;
