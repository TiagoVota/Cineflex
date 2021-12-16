import axios from 'axios'

import BASE_URL from './baseUrl'


const getFilms = () => {
	return axios.get(`${BASE_URL}/movies`)
}


export {
	getFilms,
}
