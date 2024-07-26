import { Router } from "express";
import user_routes from "../api/user/routes/user.js";
import banner_routes from "../api/banner/routes/banner.js";
import marquee_routes from "../api/marquee/routes/marquee.js";
import gallery_routes from "../api/gallery/routes/gallery.js";
import global_routes from "../api/global/routes/global.js";
import event_routes from "../api/event/routes/event.js";
import chapter_routes from "../api/chapter/routes/chapter.js";
import member_routes from "../api/member/routes/member.js";
import membercategory_routes from "../api/member_category/routes/member_category.js";
const router = Router();

router.use("/users", user_routes);
router.use("/banners", banner_routes);
router.use("/marques", marquee_routes);
router.use("/gallery", gallery_routes);
router.use("/globals", global_routes);
router.use("/events", event_routes);
router.use("/chapters", chapter_routes);
router.use("/members", member_routes);
router.use("/member-category", membercategory_routes);

export default router;
