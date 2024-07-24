import { Router } from "express";
import user_routes from "../api/user/routes/user.js";
const router = Router();

router.use("/users", user_routes);

export default router;
