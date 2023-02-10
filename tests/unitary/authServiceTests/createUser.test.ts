import { ConflictError } from "@/errors"
import { userRepository } from "@/respositories"
import { authService } from "@/services"
import { userFactory } from "../../factories"

jest.mock("@/respositories/userRepository")

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Create User", () => {
	it("should create a new user", async () => {
		const userData = userFactory.createUserData()

		jest.spyOn(authService, "userExists").mockResolvedValue(null)
		jest.spyOn(userRepository, "create").mockResolvedValue(userData)

		await authService.createUser(userData)
		expect(userRepository.create).toHaveBeenCalledTimes(1)
		expect(userRepository.create).toHaveBeenCalledWith(userData)
	})
	it("should throw an error if user already exists", async () => {
		const userData = userFactory.createUserData()

		jest.spyOn(authService, "userExists").mockResolvedValue(userData)
		jest.spyOn(userRepository, "getByCpf").mockResolvedValue(userData)

		await expect(authService.createUser(userData)).rejects.toBeInstanceOf(
			ConflictError
		)
		expect(userRepository.create).not.toHaveBeenCalled()
	})
})
