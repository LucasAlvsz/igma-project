import { Request, Response } from "express"
import { userService } from "@/services"
import { QueryParams } from "@/types/userTypes"
import { cpfUtils } from "@/utils"

const getuserByCpf = async (req: Request, res: Response) => {
	const { cpf } = req.params
	const formattedCpf = cpfUtils.formatCpf(cpf)
	const user = await userService.getUserByCpf(formattedCpf)
	res.send(user)
}

const getAllUsers = async (req: Request, res: Response) => {
	const query = req.query as {
		[key in keyof QueryParams]: string
	}
	const users = await userService.getAllUsers({
		page: Number(query.page),
		limit: Number(query.limit),
	})

	res.send(users)
}

export default { getuserByCpf, getAllUsers }
