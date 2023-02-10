import { Router } from "express"
import "express-async-errors"

import { handleError } from "@/middlewares"

const router = Router()

router.get("/health", (req, res) => res.send("OK")).use(handleError)

export default router
