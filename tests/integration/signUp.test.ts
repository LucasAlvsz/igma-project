import supertest from "supertest"
import app from "@/app"
import { prisma } from "@/config"
import { userRepository } from "@/respositories"
import { userFactory } from "../factories"

const agent = supertest(app)

beforeAll(async () => {
	await prisma.$connect().catch((err) => console.error(err))
})

beforeEach(async () => {
	await prisma.user.deleteMany()
})

describe("Sign Up", () => {
	it("should create a new user", async () => {
		const userBody = userFactory.createUserBody()
		console.log(userBody)
		const response = await agent.post("/sign-up").send(userBody)
		expect(response.status).toBe(201)

		const createdUser = await userRepository.getByCpf(userBody.cpf)
		expect(createdUser).not.toBeNull()
		expect(createdUser.cpf).toBe(userBody.cpf)
		expect(createdUser.name).toBe(userBody.name)
		expect(createdUser.birthDate).toEqual(userBody.birthDate)
	})

	it("should not create a new user if cpf already exists", async () => {
		const userBody = userFactory.createUserBody()
		await userRepository.create(userBody)

		const response = await agent.post("/sign-up").send(userBody)
		expect(response.status).toBe(409)
	})
})
