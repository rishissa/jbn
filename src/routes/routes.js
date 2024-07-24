import { Router } from "express";
import user_routes from "../api/user/routes/user.js";
import banner_routes from "../api/banner/routes/banner.js";
import marquee_routes from "../api/marquee/routes/marquee.js";
const router = Router();

router.use("/users", user_routes);
router.use("/banners", banner_routes);
router.use("/marques", marquee_routes);

export default router;
