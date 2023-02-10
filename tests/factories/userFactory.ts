import { User } from ".prisma/client"
import authSchemaUtils from "@/schemas/authSchema/authSchemaUtils"
import { faker } from "@faker-js/faker"

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

const createUserData = (overrides?: Partial<User>) => ({
	id: parseInt(faker.random.numeric()),
	name: faker.name.fullName(),
	cpf: generateValidCPF(),
	birthDate: faker.date.birthdate(),
	...overrides,
})

export default {
	createUserData,
}
