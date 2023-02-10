import { Request, Response } from "express"
import { userService } from "@/services"

const getByCpf = async (req: Request, res: Response) => {
	const { cpf } = req.params
	const user = await userService.getUserByCpf(cpf)
	res.send(user)
}

export default { getByCpf }
