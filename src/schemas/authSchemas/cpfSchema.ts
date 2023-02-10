import Joi from "joi"
import authSchemaUtils from "./authSchemaUtils"

const cpfSchema = Joi.string()
	.messages(authSchemaUtils.MESSAGES)
	.custom(authSchemaUtils.validateCpf)
	.required()

export default cpfSchema
