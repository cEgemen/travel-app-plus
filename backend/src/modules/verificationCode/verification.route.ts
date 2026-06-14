import { Router } from "express";
import {validateAccountActivationController,generateAccountActivationController} from "./verification.controller"

const verificationEndpoint = "/api/verify"
const router = Router()

//validate middleware eklenecek

router.post("/account-activation",validateAccountActivationController)

router.get("/account-activation",generateAccountActivationController)

export { router, verificationEndpoint }
 