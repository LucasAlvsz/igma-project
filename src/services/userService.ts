import { User } from "@prisma/client"
import { UserData } from "@/types/userTypes"
import { NotFoundError } from "@/errors"
import { userRepository } from "@/respositories"

const getUserByCpf = async (cpf: string): Promise<UserData> => {
	const user = await userExists(cpf)
	if (!user) throw new NotFoundError("User not found")

	return {
		id: user.id,
		name: user.name,
		birthDate: user.birthDate,
		cpf: user.cpf,
	}
}

const userExists = async (cpf: string): Promise<User | null> => {
	return userRepository.getByCpf(cpf)
}

export default {
	getUserByCpf,
	userExists,
}
