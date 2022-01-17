import { useEffect, useState } from 'react'

import { getFilms } from '../../services/service.films'
import { errorModal } from '../../factories/modalFactory'

import PageContainer from '../components/PageContainer'
import PageTitle, { titleHeight } from '../components/PageTitle'
import LoaderSpinner from '../shared/LoaderSpinner'
import Films from './Films'


const Homepage = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [filmsList, setFilmsList] = useState([])

	const errorMsg = {
		getFilms: `Não conseguimos carregar os filmes 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
	}

	useEffect(() => {
		setIsLoading(true)
		getFilms()
			.then(({ data }) => setFilmsList(data))
			.catch(() => errorModal(errorMsg.getFilms))
			.finally(() => setIsLoading(false))
	}, [])

	return (
		<PageContainer haveHeader>
			<PageTitle text='Selecione o filme' />

			{
				isLoading
					? <LoaderSpinner type='TailSpin' heightDiscount={titleHeight} />
					: <Films filmsList={filmsList} />
			}
		</PageContainer>
	)
}


export default Homepage
