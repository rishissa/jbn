import { Router } from "express";
import { create, find, update, destroy } from "../controllers/global.js";
const router = Router();
import { createRequest } from "../middlewares/global.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
import upload from "../../../../middlewares/upload.js";
// Create global
router.post("/", [jwtVerify], create);

// List globals
router.get("/", [], find);

// Update globals
router.put("/", [upload.single("brand_logo_url")], update);

// Delete global
router.delete("/:id", [], destroy);

export default router;
