import "express-async-errors"
import { Router } from "express"

import { handleError } from "@/middlewares"
import authRouter from "./authRouter"
import userRouter from "./userRouter"

const router = Router()

router
	.get("/health", (req, res) => res.send("OK"))
	.use(authRouter)
	.use("/customers", userRouter)
	.use(handleError)

export default router
