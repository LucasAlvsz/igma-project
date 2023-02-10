import { userRepository } from "@/respositories"
import { ConflictError } from "@/errors"
import { UserData } from "@/types/userTypes"

const createUser = async (user: UserData): Promise<void> => {
	if (await userExists(user.cpf))
		throw new ConflictError("User already exists")

	await userRepository.create({
		...user,
		birthDate: new Date(user.birthDate),
	})
}

const userExists = async (username: string): Promise<UserData | null> => {
	const user = await userRepository.getByCpf(username)
	return user
}

export default {
	createUser,
	userExists,
}
