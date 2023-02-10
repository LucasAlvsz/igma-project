import { ConflictError } from "@/errors"
import { userRepository } from "@/respositories"
import { authService, userService } from "@/services"
import { userFactory } from "../../factories"

jest.mock("@/respositories/userRepository")

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Create User", () => {
	it("should create a new user", async () => {
		const userData = userFactory.createUserData()
		const userBody = userFactory.createUserBody()

		jest.spyOn(userService, "userExists").mockResolvedValue(null)
		jest.spyOn(userRepository, "create").mockResolvedValue(userData)

		await authService.createUser(userBody)
		expect(userRepository.create).toHaveBeenCalledTimes(1)
		expect(userRepository.create).toHaveBeenCalledWith(userBody)
	})
	it("should throw an error if user already exists", async () => {
		const userData = userFactory.createUserData()
		const userBody = userFactory.createUserBody()

		jest.spyOn(userService, "userExists").mockResolvedValue(userData)
		jest.spyOn(userRepository, "getByCpf").mockResolvedValue(userData)

		await expect(authService.createUser(userBody)).rejects.toBeInstanceOf(
			ConflictError
		)
		expect(userRepository.create).not.toHaveBeenCalled()
	})
})
