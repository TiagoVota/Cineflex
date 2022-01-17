import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import OrderContext from '../../contexts/OrderContext'
import { getSeats, postOrder } from '../../services/service.films'
import {
	makeSeatsList,
	selectedSeats,
	addAndRemoveCustomer,
	updateSeatList,
	updateCustomersByInput,
	sanitizeCustomersInfo,
	makeName
} from '../../factories/seatsFactory'
import { errorModal } from '../../factories/modalFactory'
import { validateBuyer } from '../../validations/buyerValidation'
import { handleMultiValidation } from '../../validations/handleValidation'

import PageContainer from '../components/PageContainer'
import PageTitle, { titleHeight } from '../components/PageTitle'
import LoaderSpinner from '../shared/LoaderSpinner'
import Subtitles from './Subtitles'
import Seat from './Seat'
import CustomerInputs from './CustomerInputs'
import Footer from '../shared/Footer'


const Seats = () => {
	const { sessionId } = useParams()
	const navigate = useNavigate()
	const { setOrderInfo } = useContext(OrderContext)
	const [isLoading, setIsLoading] = useState(true)
	const [isSubmitLoading, setIsSubmitLoading] = useState(false)
	const [filmInfo, setFilmInfo] = useState({})
	const [seatsList, setSeatsList] = useState([])
	const [customersInfo, setCustomersInfo] = useState([])

	const errorMsg = {
		getSeats: `Não conseguimos carregar os assentos 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
		unavailableSeat: 'Esse assento não está disponível 🧐',
		postOrder: `Não conseguimos finalizar a compra 😔<br/>
		Atualize a página ou tente novamente mais tarde, por favor 🥺`,
		buyerValidation: (seatName, error) => {
			return `<strong>Assento ${makeName(seatName)}:</strong> ${error}`
		}
	}

	useEffect(() => {
		setIsLoading(true)
		getSeats({ sessionId })
			.then(({ data: seatsInfo }) => {
				const {
					name: time,
					day: { weekday, date },
					movie: { id, title, posterURL },
					seats
				} = seatsInfo

				setOrderInfo({ filmInfo: { id } })
				setFilmInfo({ id, sessionId, title, posterURL, time, weekday, date })
				setSeatsList(makeSeatsList(seats))
			})
			.catch(() => errorModal(errorMsg.getSeats))
			.finally(() => setIsLoading(false))
	}, [])

	const updateCustomer = ({ id, name, cpf }) => {
		const props = { id, name, cpf, customersInfo }
		setCustomersInfo(updateCustomersByInput(props))
	}

	const makeJSXSeatsList = (seatsList) => {
		const JSXSeatsList = seatsList.map((seatInfo, index) => <Seat
			key={index}
			seatInfo={seatInfo}
			onClick={handleSeatClick}
		/>)

		return JSXSeatsList
	} 

	const handleSeatClick = ({ seatId, status }) => {
		if (status === 'unavailable') return errorModal(errorMsg.unavailableSeat)

		const updatedSeatList = updateSeatList({ seatId, status, seatsList, customersInfo })
		setCustomersInfo(addAndRemoveCustomer({ customersInfo, seatId }))

		setSeatsList(updatedSeatList)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		setIsSubmitLoading(true)
		
		const orderSeats = {
			ids: selectedSeats(seatsList, 'id'),
			compradores: sanitizeCustomersInfo(customersInfo)
		}
		const { compradores: buyers } = orderSeats

		const {
			isValid,
			objectFail,
			error
		}	= handleMultiValidation(buyers, validateBuyer)
		
		if (!isValid) {
			const seatName = makeName(objectFail.idAssento)
			setIsSubmitLoading(false)

			return errorModal(errorMsg.buyerValidation(seatName, error))
		}
		
		postOrder(orderSeats)
			.then(() => {
				setOrderInfo({
					filmInfo,
					orderSeats: {
						...orderSeats,
						names: selectedSeats(seatsList, 'name')
					}
				})
				navigate('/sucesso')
			})
			.catch(() => errorModal(errorMsg.postOrder))
			.finally(() => setIsSubmitLoading(false))
	}

	const makeSubmitButtonText = (isLoading) => {
		return (
			isLoading
				? <LoaderSpinner width={'40px'} color={'#FFFFFF'} />
				: 'Reservar assento(s)'
		)
	}

	return (
		<PageContainer haveHeader haveFooter>
			<PageTitle text='Selecione o(s) assento(s)' />

			{
				isLoading
					? <LoaderSpinner type='TailSpin' heightDiscount={titleHeight} />
					: <>
						<SeatsContainer>
							{makeJSXSeatsList(seatsList)}
						</SeatsContainer>

						<Subtitles />
					</>
			}

			<form onSubmit={handleSubmit}>
				{
					customersInfo.map((customerInfo, index) => <CustomerInputs
						key={index}
						customerInfo={customerInfo}
						updateCustomer={updateCustomer}
					/>)
				}

				<Button
					type='submit'
					isLoading={isSubmitLoading}
					isHidden={customersInfo.length === 0}
				>
					{makeSubmitButtonText(isSubmitLoading)}
				</Button>
			</form>

			<Footer filmInfo={filmInfo} isLoading={isLoading} />
		</PageContainer>
	)
}


export default Seats

const seatCircleRadius = '26px'

const SeatsContainer = styled.div`
	width: 90vw;
	height: calc(5 * (${seatCircleRadius} + 18px));
	margin: -30px auto 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`

// TODO: Componentizar os botões
const Button = styled.button`
	width: 60vw;
	height: 42px;
	margin: 20px 20vw 30px;
	${p => p.isHidden ? 'display: none;' : ''}
	background: ${p => p.isLoading ? '#E89056' : '#E8833A'};
	border-radius: 3px;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.04em;
	color: #FFFFFF;
`
