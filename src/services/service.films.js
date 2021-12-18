import axios from 'axios'

import BASE_URL from './baseUrl'


const getFilms = () => {
	return axios.get(`${BASE_URL}/movies`)
}

const getSessions = ({ filmId }) => {
	return axios.get(`${BASE_URL}/movies/${filmId}/showtimes`)
}

const getSeats = ({ sessionId }) => {
	return axios.get(`${BASE_URL}/showtimes/${sessionId}/seats`)
}

const postOrder = ({ ids, name, cpf }) => {
	const body = { ids, name, cpf }
	return axios.post(`${BASE_URL}/seats/book-many`, body)
}


export {
	getFilms,
	getSessions,
	getSeats,
	postOrder,
}
