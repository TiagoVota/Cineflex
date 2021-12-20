import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

import OrderContext from '../../contexts/OrderContext'
import { getSeats, postOrder } from '../../services/service.films'
import {
	makeSeatsList,
	selectedSeats,
	updateSeatList
} from '../../factories/seatsFactory'
import { errorModal } from '../../factories/modalFactory'

import Subtitles from './Subtitles'
import Seat from './Seat'
import CustomerInputs from './CustomerInputs'
import Footer from '../shared/Footer'


const Seats = () => {
	const { sessionId } = useParams()
	const navigate = useNavigate()
	const { setOrderInfo } = useContext(OrderContext)
	const [filmInfo, setFilmInfo] = useState({})
	const [seatsList, setSeatsList] = useState([])
	const [seatsIds, setSeatsIds] = useState([])
	const [customersInfo, setCustomersInfo] = useState([])
	const [name, setName] = useState('')
	const [cpf, setCpf] = useState('')

	const errorMsg = {
		unavailableSeat: 'Esse assento não está disponível!'
	}

	useEffect(() => {
		// TODO: Melhorar resposta do catch (sweetalert)
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
			.catch(({ response }) => console.log('error:', response))
	}, [])

	const makeJSXSeatsList = (seatsList) => {
		const JSXSeatsList = seatsList.map((seatInfo, index) => <Seat
			key={index}
			seatInfo={seatInfo}
			onClick={handleSeatClick}
		/>)

		return JSXSeatsList
	} 

	const handleSeatClick = ({ seatId, status }) => {
		if (status === 'unavailable') return errorModal(errorMsg['unavailableSeat'])

		const updatedSeatList = updateSeatList({ seatId, status, seatsList })
		const seatsIds = selectedSeats(updatedSeatList, 'id')

		setSeatsIds(seatsIds)
		setSeatsList(updatedSeatList)
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		
		const orderSeats = { ids: seatsIds, name, cpf }
		
		postOrder(orderSeats)
		// TODO: Melhorar resposta do catch (sweetalert)
			.then(() => {
				setOrderInfo({
					filmInfo,
					orderSeats: {
						...orderSeats,
						names: selectedSeats(seatsList, 'name')
					}
				})
				clearInputs()
				navigate('/sucesso')
			})
			.catch(({ response }) => console.log('error:', response))
	}

	const clearInputs = () => {
		setName('')
		setCpf('')
	}

	return (
		<Container>
			<Title>
				<h2>Selecione o(s) assento(s)</h2>
			</Title>

			<SeatsContainer>
				{makeJSXSeatsList(seatsList)}
			</SeatsContainer>

			<Subtitles />

			<form onSubmit={handleSubmit}>
				{/* TODO: Fazer um Joi para as entradas esse forms */}
				<CustomerInputs
					setName={setName}				 
					name={name}
					setCpf={setCpf}
					cpf={cpf}				 
				/>

				<Button type='submit'>
					Reservar assento(s)
				</Button>
			</form>

			<Footer filmInfo={filmInfo} />

		</Container>
	)
}


export default Seats


const headerHeight = '67px'
const footerHeight = '117px'
const seatCircleRadius = '26px'

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
	margin: 20px 20vw 0;
	background: #E8833A;
	border-radius: 3px;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.04em;
	color: #FFFFFF;
`
