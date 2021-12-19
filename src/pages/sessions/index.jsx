import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { getSessions } from '../../services/service.films'

import Session from './Session'
import Footer from '../shared/Footer'


const Sessions = () => {
	const { filmId } = useParams()
	const [sessionInfo, setSessionInfo] = useState({})
	const { title, posterURL, days } = sessionInfo
	const filmInfo = { id: filmId, title, posterURL }

	useEffect(() => {
		// TODO: Melhorar resposta do catch (sweetalert)
		getSessions({filmId})
			.then(({ data }) => setSessionInfo(data))
			.catch(({ response }) => console.log('error:', response))
	}, [])

	return (
		<Container>
			<Title>
				<h2>Selecione o horário</h2>
			</Title>

			{
				Boolean(days)
					? days.map((sessionInfo, index) => <Session
						key={index}
						sessionInfo={sessionInfo}
					/>)

					: ''  // TODO: Fazer um loader para essa belezinha
			}

			<Footer filmInfo={filmInfo} />
		</Container>
	)
}


export default Sessions


const headerHeight = '67px'
const footerHeight = '117px'

const Container = styled.div`
	height: calc(100vh - ${headerHeight} - ${footerHeight});
	width: 100vw;
	margin-top: ${headerHeight};
	overflow-y: scroll;
`

const Title = styled.div`
	height: 110px;
	display: flex;
	justify-content: center;
	align-items: center;

	> h2 {
		font-style: normal;
		font-weight: normal;
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.04em;
		color: #293845;
	}
`
