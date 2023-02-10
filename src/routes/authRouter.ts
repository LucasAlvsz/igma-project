import { Router } from "express"

import { validateSchema } from "@/middlewares"
import { authSchema } from "@/schemas"
import { authController } from "@/controllers"

const authRouter = Router()

authRouter.post(
	"/sign-up",
	validateSchema(authSchema.signUpSchema),
	authController.signUp
)

export default authRouter
