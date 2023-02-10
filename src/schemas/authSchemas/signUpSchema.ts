import Joi from "joi"
import { UserBody } from "@/types/userTypes"
import cpfSchema from "./cpfSchema"

const bodySchema = Joi.object<UserBody>({
	name: Joi.string().required(),
	birthDate: Joi.date().iso().required(),
	cpf: cpfSchema,
}).options({ allowUnknown: false })

const signUpSchema = Joi.object({
	body: bodySchema,
}).options({ allowUnknown: true })

export default signUpSchema
