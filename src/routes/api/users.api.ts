import { Router } from "express";
import user from "controllers/users.controller";
const router: Router = Router();

router.get("/login", user.login);

export default router;
