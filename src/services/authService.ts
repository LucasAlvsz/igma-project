import { UserBody } from "@/types/userTypes"
import { ConflictError } from "@/errors"
import { userService } from "@/services"
import { userRepository } from "@/respositories"
import { cpfUtils } from "@/utils"

const createUser = async (user: UserBody): Promise<void> => {
	if (await userService.userExists(user.cpf))
		throw new ConflictError("User already exists")

	await userRepository.create({
		...user,
		cpf: cpfUtils.formatCpf(user.cpf),
	})
}

export default {
	createUser,
}
