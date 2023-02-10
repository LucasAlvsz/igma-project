import { faker } from "@faker-js/faker"
import { User } from ".prisma/client"
import { UserBody } from "@/types/userTypes"
import authSchemaUtils from "@/schemas/authSchemas/authSchemaUtils"

const generateValidCPF = () => {
	const cpfArray = faker.random.numeric(9).split("")
	let checkedSum = authSchemaUtils.calculateCpfCheckSum(cpfArray, 10)
	const firstDigit = checkedSum % 11 < 2 ? 0 : 11 - (checkedSum % 11)
	cpfArray.push(firstDigit.toString())
	checkedSum = authSchemaUtils.calculateCpfCheckSum(cpfArray, 11)
	const secondDigit = checkedSum % 11 < 2 ? 0 : 11 - (checkedSum % 11)
	cpfArray.push(secondDigit.toString())
	return cpfArray.join("")
}

const createUserData = (overrides?: Partial<User>): User => ({
	id: parseInt(faker.random.numeric()),
	name: faker.name.fullName(),
	cpf: generateValidCPF(),
	birthDate: faker.date.birthdate(),
	createdAt: faker.date.past(),
	updatedAt: faker.date.past(),
	...overrides,
})

const createUserBody = (overrides?: Partial<UserBody>): UserBody => ({
	name: faker.name.fullName(),
	cpf: generateValidCPF(),
	birthDate: faker.date.birthdate(),
	...overrides,
})

const createManyUsersData = (amount: number): User[] => {
	const users = []
	for (let i = 0; i < amount; i++) users.push(createUserData())

	return users
}

const createManyUsersBody = (amount: number): UserBody[] => {
	const users = []
	for (let i = 0; i < amount; i++) users.push(createUserBody())

	return users
}

export default {
	generateValidCPF,
	createUserData,
	createUserBody,
	createManyUsersData,
	createManyUsersBody,
}
