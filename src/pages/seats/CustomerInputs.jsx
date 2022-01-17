import styled from 'styled-components'

import { sanitizeCpf } from '../../factories/CpfFactory'
import { makeName } from '../../factories/seatsFactory'


const CustomerInputs = ({ updateCustomer, customerInfo }) => {
	const { idAssento: seatId } = customerInfo

	return (
		<Container>
			<Title>
				Assento {makeName(seatId)}
			</Title>

			<Label htmlFor={`Nome - ${seatId}`}>Nome do comprador:</Label>
			<Input
				id={`Nome - ${seatId}`}
				placeholder='Digite seu nome...'
				type='string'
				onChange={({ target: { value } }) => updateCustomer({
					id: seatId,
					name: value
				})}
				value={customerInfo.nome}
				required
			/>

			<Label htmlFor={`CPF - ${seatId}`}>CPF do comprador:</Label>
			<Input
				id={`CPF - ${seatId}`}
				placeholder='Digite seu CPF...'
				type='string'
				onChange={({ target: { value } }) => updateCustomer({
					id: seatId,
					cpf: sanitizeCpf(value)
				})}
				value={customerInfo.cpf}
				required
			/>
		</Container>
	)
}


export default CustomerInputs


const Container = styled.div`
	margin-top: 30px;
	display: flex;
	flex-direction: column;
`

const Title = styled.h4`
	text-align: center;
	font-weight: bold;
	font-size: 20px;
	line-height: 28px;
	letter-spacing: 0.04em;
	color: #293845;
`

const Label = styled.label`
  margin: 10px 0 0 6vw;
	display: flex;
	font-size: 18px;
	line-height: 21px;
	color: #293845;
`

const Input = styled.input`
	width: 88vw;
	height: 58px;
	margin-left: 6vw;
	padding-left: 13px;
	font-size: 20px;
	background: #FFFFFF;
	border: 1px solid #D5D5D5;
	border-radius: 3px;

	::placeholder {
		color: #AFAFAF;
	}

	:focus {
		color: #293845;
		outline: none;
	}
`
