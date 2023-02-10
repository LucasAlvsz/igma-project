import supertest from "supertest"
import app from "@/app"
import { prisma } from "@/config"
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

describe("GET /users", () => {
	it("should return 200 and an empty array if there are no users", async () => {
		const response = await agent.get("/users")
		expect(response.status).toBe(200)
		expect(response.body).toEqual([])
	})

	it("should return 200 and an array of users", async () => {
		const users = userFactory.createManyUsersBody(3)
		await prisma.user.createMany({ data: users })

		const response = await agent.get("/users")
		expect(response.status).toBe(200)
		expect(response.body.length).toBe(3)
	})

	it("should return only the users that match the query params", async () => {
		const users = userFactory.createManyUsersBody(3)
		console.log(users)
		await prisma.user.createMany({ data: users })

		const response = await agent.get("/users/?limit=1&page=1")
		console.log(response.body)
		expect(response.status).toBe(200)
		expect(response.body.length).toBe(1)
		expect(response.body[0].name).toBe(users[0].name)
		expect(response.body[0].cpf).toBe(users[0].cpf)
	})
})
