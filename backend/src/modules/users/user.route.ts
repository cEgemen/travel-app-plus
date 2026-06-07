import { Router } from "express";
import controller from "@modules/users/user.controller"
import { validater } from "@shared/middlewares/validate.middlewate";
import { USER_CREATE_DTO, USER_UPDATE_DTO } from "./user.schemas";

const userEndpoint = "/api/user"
const router = Router()

router.get("/",controller.getUsers)

router.get("/:id",controller.getUserById)

router.post("/",validater({sourceType:["body"],schemas:{body:USER_CREATE_DTO}}) ,controller.createUser)

router.put("/:id",validater({sourceType:["body"],schemas:{body:USER_UPDATE_DTO}}) ,controller.updateUser)

router.delete("/:id",controller.deleteUser)

export {
    router as userRouter,
    userEndpoint
}