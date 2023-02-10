import { UserBody } from "@/types/userTypes"
import { ConflictError } from "@/errors"
import { userService } from "@/services"
import { userRepository } from "@/respositories"

const createUser = async (user: UserBody): Promise<void> => {
	if (await userService.userExists(user.cpf))
		throw new ConflictError("User already exists")

	await userRepository.create(user)
}

export default {
	createUser,
}
