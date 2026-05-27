import { Router} from "express";
import {singInController,signUpController,signOutController,refreshController,meController} from "@modules/auth/auth.controller"
import { validater } from "@shared/middlewares/validate.middlewate";
import { signInSchema, signUpSchema } from "./auth.schemas";

const router = Router()

router.post("/sign-up",validater({schemas:{
    body:signUpSchema
},sourceType:["body"]}),signUpController)
router.post("/sign-in",validater({schemas:{
    body:signInSchema
},sourceType:["body"]}),singInController)
router.get("/sign-out",signOutController)
router.post("/refresh",refreshController)
router.get("/me",meController)

export default router