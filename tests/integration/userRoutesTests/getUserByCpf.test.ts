import supertest from "supertest"
import app from "@/app"
import { prisma } from "@/config"
import { userRepository } from "@/respositories"
import { userFactory } from "../../factories"

const agent = supertest(app)

beforeAll(async () => {
	await prisma.$connect().catch((err) => console.error(err))
})

beforeEach(async () => {
	await prisma.user.deleteMany()
})

afterAll(async () => {
	await prisma.$disconnect().catch((err) => console.error(err))
})

describe("Get User By CPF", () => {
	it("should return 404 if user not found", async () => {
		const cpf = userFactory.generateValidCPF()

		const response = await agent.get(`/users/${cpf}`)
		expect(response.status).toBe(404)
	})

	it("should return 200 and user data if user exists", async () => {
		const userBody = userFactory.createUserBody()
		await userRepository.create(userBody)

		const response = await agent.get(`/users/${userBody.cpf}`)
		expect(response.status).toBe(200)
		expect(response.body.cpf).toBe(userBody.cpf)
		expect(response.body.name).toBe(userBody.name)
		expect(response.body.birthDate).toBe(userBody.birthDate.toISOString())
	})
})
