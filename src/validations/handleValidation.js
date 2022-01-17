import { messages } from 'joi-translation-pt-br'


const handleMultiValidation = (list, validation) => {
	const result = {}

	result.objectFail = list.find((element) => {
		const { isValid, error } = handleValidation(element, validation)
		result.isValid = isValid
		result.error = error

		return !isValid
	})

	return result
}

const handleValidation = (object, objectValidation) => {
	const objectError = objectValidation.validate(object, { messages }).error
	const errorMessage = objectError?.details?.[0]?.message
	const error = Boolean(errorMessage) ? improveErrorText(errorMessage) : null
	
	return {
		isValid: !objectError,
		error
	}
}

const improveErrorText = (errorStr) => {
	const strReplaces = [
		['nome', 'Nome'],
		['cpf', 'Cpf'],
	]

	return strReplaces.reduce((acc, rep) => acc.replace(rep[0], rep[1]), errorStr)
}


export {
	handleMultiValidation,
	handleValidation,
}
