import joi from 'joi'


const validateBuyer = joi.object({
	nome: joi.string().min(2).max(70).required(),
	cpf: joi.string().length(11).required(),
	idAssento: joi.number().integer().required(),
}).length(3)


export {
	validateBuyer,
}
