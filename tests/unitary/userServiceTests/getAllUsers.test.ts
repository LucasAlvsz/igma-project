import { userRepository } from "@/respositories"
import { userService } from "@/services"
import { userFactory } from "../../factories"

beforeEach(() => {
	jest.clearAllMocks()
})

describe("Get All Users", () => {
	it("should return a list of users", async () => {
		const userData = userFactory.createUserData()
		const query = { page: 1, limit: 10 }

		jest.spyOn(userRepository, "getAll").mockResolvedValue([userData])

		const users = await userService.getAllUsers(query)
		expect(users).toEqual([userData])
		expect(userRepository.getAll).toHaveBeenCalledTimes(1)
		expect(userRepository.getAll).toHaveBeenCalledWith(query)
	})

	it("should return a empty list if there are no users", async () => {
		const query = { page: 1, limit: 10 }

		jest.spyOn(userRepository, "getAll").mockResolvedValue([])

		const users = await userService.getAllUsers(query)
		expect(users).toEqual([])
		expect(userRepository.getAll).toHaveBeenCalledTimes(1)
		expect(userRepository.getAll).toHaveBeenCalledWith(query)
	})
})
