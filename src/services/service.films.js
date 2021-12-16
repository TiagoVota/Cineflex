import axios from 'axios'

import BASE_URL from './baseUrl'


const getFilms = () => {
	return axios.get(`${BASE_URL}/movies`)
}

const getSessions = ({ filmId }) => {
	return axios.get(`${BASE_URL}/movies/${filmId}/showtimes`)
}


export {
	getFilms,
	getSessions,
}
