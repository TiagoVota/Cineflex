import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { getSessions } from '../../services/service.films'

import LoaderSpinner from '../shared/LoaderSpinner'
import Session from './Session'
import Footer from '../shared/Footer'


const Sessions = () => {
	const { filmId } = useParams()
	const [sessionInfo, setSessionInfo] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const { title, posterURL, days } = sessionInfo
	const filmInfo = { id: filmId, title, posterURL }
	
	useEffect(() => {
		setIsLoading(true)
		// TODO: Melhorar resposta do catch (sweetalert)
		getSessions({filmId})
			.then(({ data }) => setSessionInfo(data))
			.catch(({ response }) => console.log('error:', response))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<Container>
			<Title>
				<h2>Selecione o horário</h2>
			</Title>

			
			{
				isLoading
					? <LoaderSpinner type='TailSpin' heightDiscount={titleHeight} />
					: days.map((sessionInfo, index) => <Session
						key={index}
						sessionInfo={sessionInfo}
					/>)
			}

			<Footer filmInfo={filmInfo} isLoading={isLoading} />
		</Container>
	)
}


export default Sessions


const headerHeight = '67px'
const footerHeight = '117px'
const titleHeight = '110px'

const Container = styled.div`
	height: calc(100vh - ${headerHeight} - ${footerHeight});
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
