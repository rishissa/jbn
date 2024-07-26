import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
} from "../controllers/member.js";
const router = Router();
import {
  checkMemberValidations,
  createRequest,
} from "../middlewares/member.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import upload from "../../../../middlewares/upload.js";
// Create member
router.post(
  "/",
  [jwtVerify, upload.single("profile_pic_url"), checkMemberValidations],
  create
);

// List members
router.get("/", [], find);

// List Single member
router.get("/:id", [], findOne);

// Update members
router.put(
  "/:id",
  [jwtVerify, upload.single("profile_pic_url"), checkMemberValidations],
  update
);

// Delete member
router.delete("/:id", [], destroy);

export default router;
