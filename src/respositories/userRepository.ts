import { prisma } from "@/config"

import { User } from "@prisma/client"
import { QueryParams, UserBody, UserData } from "@/types/userTypes"

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

const getAll = async (query: QueryParams): Promise<UserData[]> => {
	return prisma.user.findMany({
		orderBy: { createdAt: "desc" },
		skip: (query.page - 1) * query.limit,
		take: query.limit,
		select: {
			id: true,
			cpf: true,
			name: true,
			birthDate: true,
		},
	})
}

export default { create, getByCpf, getAll }
