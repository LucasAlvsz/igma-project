import { Router } from "express"
import "express-async-errors"

import { handleError } from "@/middlewares"
import authRouter from "./authRouter"

const router = Router()

router
	.get("/health", (req, res) => res.send("OK"))
	.use(authRouter)
	.use(handleError)

export default router
