import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getFilms } from '../../services/service.films'

import Header from '../shared/Header'
import Poster from '../shared/Poster'


const Homepage = () => {
	const [filmList, setFilmList] = useState([])

	useEffect(() => {
		// TODO: Melhorar retorno do erro (throw modal)
		getFilms()
			.then(({ data }) => setFilmList(data))
			.catch(({ response }) => console.log('error:', response))
	}, [])

	return (
		<Container>
			<Header />

			<Title>
				<H1>Selecione o filme</H1>
			</Title>

			<FilmsContainer>
				{/* TODO: Fazer um loader aqui */}
				{
					filmList.map((filmInfo, index) => <Poster
						key={index}
						filmInfo={filmInfo}
					/>)
				}
			</FilmsContainer>
			{/* TODO: colocar um espaço ao final dos posters */}
		</Container>
	)
}


export default Homepage


const headerHeight = '67px'

const Container = styled.div`
	height: calc(100vh - ${headerHeight});
	width: 100vw;
	margin-top: ${headerHeight};
	overflow-y: scroll;
`

const Title = styled.div`
	height: 110px;
	display: flex;
	justify-content: center;
	align-items: center;
`

const H1 = styled.h1`
	font-style: normal;
	font-weight: normal;
	font-size: 24px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: #293845;
`

const FilmsContainer = styled.div`
	width: 90vw;
	margin-left: 5vw;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
`
