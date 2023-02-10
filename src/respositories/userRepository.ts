import { prisma } from "@/config"
import { UserData } from "@/types/userTypes"

const create = async (user: UserData): Promise<UserData> => {
	return prisma.user.create({
		data: user,
	})
}

const getByCpf = async (cpf: string): Promise<UserData> => {
	return prisma.user.findUnique({
		where: { cpf },
	})
}

export default { create, getByCpf }
