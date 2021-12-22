const sanitizeCpf = (cpf) => {
	const onlyNumbers = new RegExp(
		/^[0-9]{0,3}[.]?[0-9]{0,3}[.]?[0-9]{0,3}[-]?[0-9]{0,2}$/
	)

	if (!onlyNumbers.test(cpf)) return cpf.slice(0, -1)

	return cpf
}

const displayCpf = (cpf) => {
	const cpfLen = cpf.length
	
	if (cpfLen === 3+1) cpf = updateCpf(cpf, '.')
	if (cpfLen === 6+2) cpf = updateCpf(cpf, '.')
	if (cpfLen === 9+3) cpf = updateCpf(cpf, '-')

	return cpf
}

const updateCpf = (cpf, especialChar) => {
	const lastChar = cpf.slice(-1)
	
	return (lastChar === especialChar)
		? cpf.slice(0, -1)
		: addCharAt(cpf, especialChar, cpf.length-1)
}

const addCharAt = (str, char, position) => {
	str = [...str]
	str.splice(position, 0, char)
	return str.join('')
}


export {
	sanitizeCpf,
	displayCpf,
}
