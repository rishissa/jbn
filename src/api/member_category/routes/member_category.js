
            import { Router } from 'express';
            import { create, find, update, destroy, findOne } from '../controllers/member_category.js';
            const router = Router();
            import {createRequest} from "../middlewares/member_category.js"
            // Create member_category
            router.post("/api/member_categorys", [createRequest], create);
        
            // List member_categorys
            router.get("/api/member_categorys", [], find);
        
            // List Single member_category
            router.get("/api/member_categorys/:id", [], findOne);
        
            // Update member_categorys
            router.put("/api/member_categorys/:id", [], update);
        
            // Delete member_category
            router.delete("/api/member_categorys/:id", [], destroy);
        
            export default router;
          