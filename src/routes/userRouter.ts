import { Router } from "express"

import { validateSchema } from "@/middlewares"
import { userSchemas } from "@/schemas"
import { userController } from "@/controllers"

const userRouter = Router()

userRouter.get(
	"/:cpf",
	validateSchema(userSchemas.getByCpfSchema),
	userController.getByCpf
)

export default userRouter
