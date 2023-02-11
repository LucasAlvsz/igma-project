const formatCpf = (cpf: string) => {
	return cpf.replace(/[^\d]/g, "")
}

export default {
	formatCpf,
}
