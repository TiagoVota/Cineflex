import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getSessions } from '../../services/service.films'
import { errorModal } from '../../factories/modalFactory'

import PageContainer from '../components/PageContainer'
import PageTitle, { titleHeight } from '../components/PageTitle'
import LoaderSpinner from '../shared/LoaderSpinner'
import SessionsList from './SessionsList'
import Footer from '../shared/Footer'


const Sessions = () => {
	const { filmId } = useParams()
	const [sessionInfo, setSessionInfo] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const { title, posterURL, days=[] } = sessionInfo
	const filmInfo = { id: filmId, title, posterURL }

	const errorMsg = {
		getSessions: `Não conseguimos carregar as sessões 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}
	
	useEffect(() => {
		setIsLoading(true)
		getSessions({filmId})
			.then(({ data }) => setSessionInfo(data))
			.catch(() => errorModal(errorMsg.getSessions))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<PageContainer haveHeader haveFooter>
			<PageTitle text='Selecione o horário' />

			{
				isLoading
					? <LoaderSpinner type='TailSpin' heightDiscount={titleHeight} />
					: <SessionsList days={days}/>
			}

			<Footer filmInfo={filmInfo} isLoading={isLoading} />
		</PageContainer>
	)
}


export default Sessions
