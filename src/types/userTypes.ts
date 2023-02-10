import { User } from ".prisma/client"

type UserData = Omit<User, "createdAt" | "updatedAt">
type UserBody = Omit<UserData, "id">
type QueryParams = { page: number; limit: number }

export { UserData, UserBody, QueryParams }
