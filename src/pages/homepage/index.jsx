import { useEffect, useState } from 'react'
import styled from 'styled-components'

import { getFilms } from '../../services/service.films'

import LoaderSpinner from '../shared/LoaderSpinner'
import Films from './Films'


const Homepage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [filmsList, setFilmsList] = useState([])

	useEffect(() => {
		setIsLoading(true)
		// TODO: Melhorar retorno do erro (throw modal)
		getFilms()
			.then(({ data }) => setFilmsList(data))
			.catch(({ response }) => console.log('error:', response))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<Container>
			<Title>
				<h2>Selecione o filme</h2>
			</Title>

			{
				isLoading
					? <LoaderSpinner type='TailSpin' heightDiscount={titleHeight} />
					: <Films filmsList={filmsList} />
			}
		</Container>
	)
}


export default Homepage


// TODO: Colocar o componente container num lugar separado
const headerHeight = '67px'
const titleHeight = '110px'

const Container = styled.div`
	height: calc(100vh - ${headerHeight});
	width: 100vw;
	margin-top: ${headerHeight};
	overflow-y: scroll;
`

const Title = styled.div`
	height: ${titleHeight};
	display: flex;
	justify-content: center;
	align-items: center;

	> h2 {
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.04em;
		color: #293845;
	}
`
