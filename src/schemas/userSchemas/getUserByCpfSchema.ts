import Joi from "joi"
import cpfSchema from "../authSchemas/cpfSchema"

const querySchema = Joi.object({
	cpf: cpfSchema,
}).options({ allowUnknown: false })

const getUserByCpfSchema = Joi.object({
	params: querySchema,
}).options({ allowUnknown: true })

export default getUserByCpfSchema
