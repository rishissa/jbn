import { Router } from "express";
import {
  find,
  update,
  destroy,
  findOne,
  createAboutUs,
  createTermsAndConditions,
  createPrivacyPolicy,
} from "../controllers/public_data.js";
const router = Router();
import { createRequest } from "../middlewares/public_data.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import multer from "multer";

const upload = multer({
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const uploadFields = upload.single("profile_pic_url");

// Create public_data
router.post("/about-us", [jwtVerify, uploadFields], createAboutUs);
router.post("/terms", [jwtVerify, uploadFields], createTermsAndConditions);
router.post("/privacy", [jwtVerify, uploadFields], createPrivacyPolicy);

// List public_datas
router.get("/", [jwtVerify], find);

// List Single public_data
router.get("/:id", [jwtVerify], findOne);

// Update public_datas
router.put("/:id", [jwtVerify], update);

// Delete public_data
router.delete("/:id", [jwtVerify], destroy);

export default router;
