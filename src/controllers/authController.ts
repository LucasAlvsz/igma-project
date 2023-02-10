import { Request, Response } from "express"

import { authService } from "@/services"

const signUp = async (req: Request, res: Response) => {
	const userData = req.body

	await authService.createUser(userData)
	res.sendStatus(201)
}

export default {
	signUp,
}
