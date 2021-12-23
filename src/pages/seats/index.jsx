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
		<Container>
			<Title>
				<h2>Selecione o(s) assento(s)</h2>
			</Title>

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
		</Container>
	)
}


export default Seats


const headerHeight = '67px'
const footerHeight = '117px'
const titleHeight = '110px'
const seatCircleRadius = '26px'

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

const SeatsContainer = styled.div`
	width: 90vw;
	height: calc(5 * (${seatCircleRadius} + 18px));
	margin: -30px auto 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
`

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
