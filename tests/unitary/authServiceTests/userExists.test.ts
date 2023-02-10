import { userRepository } from "@/respositories"
import { authService } from "@/services"
import { userFactory } from "../../factories"

beforeEach(() => {
	jest.clearAllMocks()
})

describe("User Exists", () => {
	it("should return a user if it exists", async () => {
		const userData = userFactory.createUserData()
		jest.spyOn(userRepository, "getByCpf").mockResolvedValue(userData)

		const user = await authService.userExists(userData.cpf)
		expect(user).toEqual(userData)
		expect(userRepository.getByCpf).toHaveBeenCalledTimes(1)
		expect(userRepository.getByCpf).toHaveBeenCalledWith(userData.cpf)
	})
	it("should return null if user does not exist", async () => {
		const userData = userFactory.createUserData()

		jest.spyOn(userRepository, "getByCpf").mockResolvedValue(null)

		const user = await authService.userExists(userData.cpf)
		expect(user).toBeNull()
		expect(userRepository.getByCpf).toHaveBeenCalledTimes(1)
		expect(userRepository.getByCpf).toHaveBeenCalledWith(userData.cpf)
	})
})
