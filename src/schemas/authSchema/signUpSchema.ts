import JoiBase from "joi"
import JoiDate from "@joi/date"
import authSchemaUtils from "./authSchemaUtils"

const Joi = JoiBase.extend(JoiDate)

const bodySchema = Joi.object({
	name: Joi.string().required(),
	cpf: Joi.string()
		.messages(authSchemaUtils.MESSAGES)
		.custom(authSchemaUtils.validateCpf)
		.required(),
	birthDate: Joi.date().format(authSchemaUtils.DATE_FORMAT).required(),
}).options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
