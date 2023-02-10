import Joi from "joi"
import { UserData } from "@/types/userTypes"
import authSchemaUtils from "./authSchemaUtils"

const bodySchema = Joi.object<UserData>({
	name: Joi.string().required(),
	cpf: Joi.string()
		.messages(authSchemaUtils.MESSAGES)
		.custom(authSchemaUtils.validateCpf)
		.required(),
	birthDate: Joi.date().iso().required(),
}).options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
