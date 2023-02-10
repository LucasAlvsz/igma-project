import Joi from "joi"
import { QueryParams } from "@/types/userTypes"

const querySchema = Joi.object<QueryParams>({
	page: Joi.number().integer().min(1),
	limit: Joi.number().integer().min(1).max(100),
}).options({ allowUnknown: false })

const getAllUsersSchema = Joi.object({
	query: querySchema,
}).options({ allowUnknown: true })

export default getAllUsersSchema
