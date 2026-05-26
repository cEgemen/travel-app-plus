import { Router,Request,Response } from "express";
import {singInController,signUpController,signOutController,refreshController,meController} from "@modules/auth/auth.controller"

const router = Router()

router.post("/sign-up",signUpController)
router.post("/sign-in",singInController)
router.get("/sign-out",signOutController)
router.post("/refresh",refreshController)
router.get("/me",meController)
