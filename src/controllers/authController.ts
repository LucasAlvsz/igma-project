import { Request, Response } from "express"

import { authService } from "@/services"

const signUp = async (req: Request, res: Response) => {
	const userData = req.body

	const user = await authService.createUser(userData)
	res.status(201).send(user)
}

export default {
	signUp,
}
