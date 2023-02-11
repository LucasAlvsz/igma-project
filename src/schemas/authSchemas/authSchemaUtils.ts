import { cpfUtils } from "@/utils"
import Joi from "joi"
const MESSAGES = {
	"cpf.pattern.invalid": "Invalid CPF Format",
	"cpf.invalid": "Invalid CPF",
}

const calculateCpfCheckSum = (cpfArray: string[], count: number): number => {
	return cpfArray.reduce((acc, digit: string) => {
		acc += parseInt(digit) * count
		count--
		return acc
	}, 0)
}

const validateCpfPattern = (cpf: string) => {
	const CPF_WITH_MASK_REGEX = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}/
	const CPF_WITHOUT_MASK_REGEX = /^[0-9]{11}/

	if (!CPF_WITH_MASK_REGEX.test(cpf) && !CPF_WITHOUT_MASK_REGEX.test(cpf))
		return false

	return true
}

const validateDigit = (checkedSum: number, digit: number) => {
	const remainder = checkedSum % 11
	const calculatedDigit = remainder < 2 ? 0 : 11 - remainder
	return calculatedDigit === digit ? digit : null
}

const validateCpf = (cpf: string, helpers: Joi.CustomHelpers) => {
	if (!validateCpfPattern(cpf)) return helpers.error("cpf.pattern.invalid")

	const formattedCpf = cpfUtils.formatCpf(cpf)
	const formattedCpfForValidation = formattedCpf.slice(0, 9).split("")

	let checkedSum = calculateCpfCheckSum(formattedCpfForValidation, 10)
	const firstDigit = validateDigit(checkedSum, parseInt(formattedCpf[9]))
	if (firstDigit === null) return helpers.error("cpf.invalid")

	formattedCpfForValidation.push(firstDigit.toString())
	checkedSum = calculateCpfCheckSum(formattedCpfForValidation, 11)
	const secondDigit = validateDigit(checkedSum, parseInt(formattedCpf[10]))
	if (secondDigit === null) return helpers.error("cpf.invalid")
}

export default {
	MESSAGES,
	validateCpf,
	calculateCpfCheckSum,
}
