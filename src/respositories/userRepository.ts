import { prisma } from "@/config"

import { User } from "@prisma/client"
import { UserBody } from "@/types/userTypes"

const create = async (user: UserBody): Promise<User> => {
	return prisma.user.create({
		data: user,
	})
}

const getByCpf = async (cpf: string): Promise<User> => {
	return prisma.user.findUnique({
		where: { cpf },
	})
}

export default { create, getByCpf }
