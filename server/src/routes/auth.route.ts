import {Router} from "express";
import { login, register, userProfile } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import { validate } from "../middlewares/validation.middleware";
import { isUserAuthenticated } from "../middlewares/authentication";

const router = Router();

router.post("/register",validate(registerSchema),register);
router.post("/login",validate(loginSchema),login);
router.get("/profile",isUserAuthenticated, userProfile);

export default router;