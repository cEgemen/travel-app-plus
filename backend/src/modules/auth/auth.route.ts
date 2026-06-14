import { Router } from "express";
import { signInController, signUpController, signOutController, refreshController, meController, forgetPasswordController, resetPasswordController } from "@modules/auth/auth.controller"
import { validater } from "@shared/middlewares/validate.middlewate";
import { SIGN_IN_DTO, SIGN_UP_DTO,SIGN_OUT_DTO, FORGET_PASSWORD_DTO, RESET_PASSWORD_DTO } from "./auth.schemas";

const authEndpoint = "/api/auth"
const router = Router()

router.post("/sign-up", validater({
    schemas: {
        body: SIGN_UP_DTO
    }, sourceType: ["body"]
}), signUpController)
router.post("/sign-in", validater({
    schemas: {
        body: SIGN_IN_DTO
    }, sourceType: ["body"]
}), signInController)
router.post("/sign-out", validater({
    schemas: {
        body: SIGN_OUT_DTO
    }, sourceType: ["body"]
}), signOutController)
router.get("/refresh", refreshController)
router.get("/me", meController)
router.post("/forget-password",validater({
    schemas : {
        body : FORGET_PASSWORD_DTO
    }, sourceType : ["body"]
}),forgetPasswordController)
router.post("/reset-password",validater({
    schemas : {
        body : RESET_PASSWORD_DTO
    }, sourceType : ["body"]
}),resetPasswordController)

export {
    router as authRouter,
    authEndpoint
}