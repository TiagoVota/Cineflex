import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import PageContainer from '../components/PageContainer'
import PageTitle from '../components/PageTitle'
import OrderContext from '../../contexts/OrderContext'
import { sanitizeCpf } from '../../factories/CpfFactory'


const Success = () => {
	const navigate = useNavigate()
	const { orderInfo, setOrderInfo } = useContext(OrderContext)
	const {
		filmInfo: { title, date, time }={},
		orderSeats: { names=[], compradores: customersInfo=[] }={}
	} = orderInfo

	const handleClick = () => {
		setOrderInfo({})
		navigate('/')
	}

	return (
		<PageContainer haveHeader>
			<PageTitle
				text={<>Pedido feito<br/>com sucesso!</>}
				isSuccessPage
			/>

			<InfoTitle>Filme e sessão</InfoTitle>
			<InfoSubtitle>
				{title}<br/>
				{`${date} - ${time}`}
			</InfoSubtitle>

			<InfoTitle>
				{names.length > 1 ? 'Ingressos' : 'Ingresso'}
			</InfoTitle>
			{
				names.map((id, index) => {
					return (
						<InfoSubtitle key={index}>
							Assento {id}
						</InfoSubtitle>
					)
				})
			}

			<InfoTitle>
				{names.length > 1 ? 'Compradores' : 'Comprador'}
			</InfoTitle>
			{
				customersInfo.map(({ nome, cpf}, index) => {
					return (
						<InfoSubtitle key={index}>
							Nome: {nome}<br/>
							CPF: {sanitizeCpf(cpf)}
						</InfoSubtitle>
					)
				})
			}

			<Button onClick={handleClick}>
				Voltar pra Home
			</Button>

		</PageContainer>
	)
}


export default Success


const InfoTitle = styled.h3`
	margin: 10vw 0 5px 8vw;
	font-weight: bold;
	font-size: 24px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: #293845;
`

const InfoSubtitle = styled.h4`
	margin: 0 0 2vh 8vw;
	font-size: 22px;
	line-height: 26px;
	letter-spacing: 0.04em;
	color: #293845;
`

const Button = styled.button`
	width: 60vw;
	height: 42px;
	margin: 50px 20vw 20vw;
	background: #E8833A;
	border-radius: 3px;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.04em;
	color: #FFFFFF;
`
