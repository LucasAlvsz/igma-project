import { Request, Response } from "express"

import { authService } from "@/services"

const signUp = async (req: Request, res: Response) => {
	const userBody = req.body

	await authService.createUser(userBody)
	res.sendStatus(201)
}

export default {
	signUp,
}
