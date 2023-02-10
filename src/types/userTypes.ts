import { User } from ".prisma/client"

type UserData = Omit<User, "id" | "createdAt" | "updatedAt">

export { UserData }
