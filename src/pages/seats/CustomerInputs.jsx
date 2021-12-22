import styled from 'styled-components'


const CustomerInputs = ({ updateCustomer, customerInfo }) => {
	const { idAssento: seatId } = customerInfo
	return (
		<Container>
			<Title>
				{/* TODO: Arrumar o name aqui */}
				Assento {seatId%50 === 0 ? 50 : seatId%50}
			</Title>

			<Label htmlFor='Nome'>Nome do comprador:</Label>
			<Input
				id='Nome'
				placeholder='Digite seu nome...'
				type='string'
				onChange={({ target: { value } }) => updateCustomer({
					id: seatId,
					name: value
				})}
				value={customerInfo.nome}
				required
			/>

			<Label htmlFor='CPF'>CPF do comprador:</Label>
			<Input
				id='CPF'
				placeholder='Digite seu CPF...'
				type='string'
				onChange={({ target: { value } }) => updateCustomer({
					id: seatId,
					cpf: value
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
	align-items: center;
`

const Title = styled.h4`
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
