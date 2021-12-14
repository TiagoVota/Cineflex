import axios from 'axios'

import BASE_URL from './baseUrl'


const postExample = (body) => {
	return axios.post(`${BASE_URL}/sign-up`, body)
}


export {
	postExample,
}
