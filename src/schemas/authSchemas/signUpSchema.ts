import Joibase from "joi"
import JoiDate from "@joi/date"

const Joi = Joibase.extend(JoiDate)

const DATE_FORMAT = "YYYY-MM-DD"

const bodySchema = Joi.object({
	name: Joi.string().required(),
	cpf: Joi.string().required(),
	birthDate: Joi.date().format(DATE_FORMAT).required(),
}).options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
