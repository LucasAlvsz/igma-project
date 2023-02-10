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
		const userData = userFactory.createUserData()
		delete userData.id
		const response = await agent.post("/sign-up").send(userData)
		expect(response.status).toBe(201)

		const createdUser = await userRepository.getByCpf(userData.cpf)
		expect(createdUser).not.toBeNull()
	})

	it("should not create a new user if cpf already exists", async () => {
		const userData = userFactory.createUserData()
		delete userData.id
		await userRepository.create(userData)
		const response = await agent.post("/sign-up").send(userData)
		expect(response.status).toBe(409)
	})
})
