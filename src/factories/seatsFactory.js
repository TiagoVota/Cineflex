import { confirmModal } from './modalFactory'


/*
	Olá Thiago! Então, eu criei algumas funções auxiliares aqui, não sabia bem se
	elas ficavam melhor num arquivo tipo esse de factory ou em algum 'helper' ou
	onde colocar. Tens alguma sugestão para mim?
*/
const makeSeatsList = (seats) => {
	if (!seats?.[0]) return []

	const makeStatus = isAvailable => isAvailable ? 'available' : 'unavailable'
	const makeName = name => name.length === 1 ? `0${name}` : name

	const seatsList = seats.map(({ id, name, isAvailable }) => {
		return {
			id,
			name: makeName(name),
			status: makeStatus(isAvailable)
		}
	})

	return seatsList
}

const seatColors = (status) => {
	const colorStatus = {
		unavailable: {
			background: '#FBE192',
			border: '#F7C52B',
		},
		available: {
			background: '#C3CFD9',
			border: '#808F9D',
		},
		selected: {
			background: '#8DD7CF',
			border: '#45BDB0',
		},
	}

	const colors = {
		background: colorStatus[status].background,
		border: colorStatus[status].border,
	}

	return colors
}

const updateSeatList = ({ seatId, status, seatsList, customersInfo }) => {
	
	const updateStatus = {
		available: 'selected',
		selected: 'available'
	}
	
	const updatedSeatList = [...seatsList]
	const toUpdateIndex = updatedSeatList.findIndex(({ id }) => id === seatId)
	// if (!confirmDeleteSeat({ status, seatId, customerInfo: findCustomerById({ id: seatId, customersInfo }) })) return seatsList
	
	updatedSeatList[toUpdateIndex].status = updateStatus[status]

	return updatedSeatList
}

const confirmDeleteSeat = ({ status, seatId, customerInfo }) => {
	// TODO: Corrigir, não está totalmente operante, então está em desuso
	const haveName = customerInfo.nome
	const haveCpf = customerInfo.cpf

	if (status !== 'selected') return true
	if (!haveName && !haveCpf) return true

	const title = `Deseja mesmo deletar o assento ${seatId % 50}?`
	const text = 'Todos os dados dele serão apagados!'
	let confirmDelete = false

	confirmModal(title, text)
		.then((result) => confirmDelete = result.isConfirmed)

	return confirmDelete
}

const selectedSeats = (seatList, type) => {
	const seatsList = seatList
		.filter(({ status }) => status === 'selected')
		.map(seat => seat[type])

	return seatsList
}


/*
	TODO: Olá Thiago! Quero umas dicas de como melhorar essa função abaixo, acho
	que ela ficou com muitas responsabilidades e achei meio desorganizada (por
	causa do tanto de coisa que ela faz e do fato de todas as funcionalidades de-
	penderem de algo definido na própria função, tipo o 'newCustomers'). Alguma
	sugestão de melhoria, ou de onde eu poderia procurar conhecimento para lidar
	com esse tipo de dúvida?
*/
const addAndRemoveCustomer = ({ customersInfo, seatId }) => {
	if (customersInfo.length === 0) return [createCustomer(seatId)]
	const newCustomers = [ ...customersInfo ]

	let lastSmallerIndex = -1
	const customerIndex = customersInfo.findIndex(({ idAssento }, index) => {
		if (idAssento < seatId) lastSmallerIndex = index
		return idAssento === seatId
	})

	customerIndex === -1
		? newCustomers.splice(lastSmallerIndex+1, 0, createCustomer(seatId))
		: newCustomers.splice(customerIndex, 1)

	return newCustomers
}

const createCustomer = (seatId) => {
	return {
		idAssento: seatId,
		nome: '',
		cpf: ''
	}
}

const updateCustomersByInput = ({ id, name, cpf, customersInfo }) => {
	const inputIndex = customersInfo.findIndex(({ idAssento }) => idAssento === id)
	
	const updatedCustomersInfo = [...customersInfo]
	const customerToUpdate = updatedCustomersInfo[inputIndex]

	updatedCustomersInfo[inputIndex] = Boolean(name)
		? { ...customerToUpdate, nome: name }
		: { ...customerToUpdate, cpf }

	return updatedCustomersInfo
}

const findCustomerById = ({ id, customersInfo }) => {
	return customersInfo.find(({ idAssento }) => idAssento === id)
}


export {
	makeSeatsList,
	seatColors,
	updateSeatList,
	selectedSeats,
	addAndRemoveCustomer,
	updateCustomersByInput,
	findCustomerById,
}
