import { User } from ".prisma/client"

type UserData = Omit<User, "createdAt" | "updatedAt">
type UserBody = Omit<UserData, "id">

export { UserData, UserBody }
