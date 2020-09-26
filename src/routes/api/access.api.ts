import { Router } from "express";
import Access from "../../controllers/access.controller";
const router: Router = Router();

router.get("/login", Access.login);

export default router;
