import { Router } from "express";
import {
  create,
  find,
  update,
  destroy,
  findOne,
  getMembersCountByCategory,
} from "../controllers/member_category.js";
const router = Router();
import { createRequest } from "../middlewares/member_category.js";
import { jwtVerify } from "../../../../middlewares/jwt_verify.js";
// Create member_category
router.post("/", [jwtVerify, createRequest], create);

// List member_categorys
router.get("/", [jwtVerify], find);

router.get("/stats", [jwtVerify], getMembersCountByCategory);
// List Single member_category
router.get("/:id", [jwtVerify], findOne);

// Update member_categorys
router.put("/:id", [jwtVerify], update);

// Delete member_category
router.delete("/:id", [jwtVerify], destroy);

export default router;
