import { Router } from "express";
import { check } from "express-validator";
import user from "controllers/users.controller";
const router: Router = Router();

//Access
router.post("/signIn", [check("email").not().isEmpty().withMessage("Email is required"), check("password").not().isEmpty().withMessage("password is required")], user.signIn);
router.post("/signUp", [check("email").not().isEmpty().withMessage("Email is required"), check("firstName").not().isEmpty().withMessage("Fist name is required"), check("lastName").not().isEmpty().withMessage("Last name is required"), check("password").not().isEmpty().withMessage("password is required")], user.signUp);

export default router;
