import styled from 'styled-components'

const CustomerInputs = ({ setName, name, setCpf, cpf }) => {
	return (
		<Container>
			<Label htmlFor='Nome'>Nome do comprador:</Label>
			<Input
				id='Nome'
				placeholder='Digite seu nome...'
				type='string'
				onChange={({ target: { value } }) => setName(value)}
				value={name}
				required
			/>

			<Label htmlFor='CPF'>CPF do comprador:</Label>
			<Input
				id='CPF'
				placeholder='Digite seu CPF...'
				type='string'
				onChange={({ target: { value } }) => setCpf(value)}
				value={cpf}
				required
			/>
		</Container>
	)
}


export default CustomerInputs


const Container = styled.div`
	margin-top: 30px;
`

const Label = styled.label`
	font-style: normal;
  margin: 10px 0 0 6vw;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 24px;
	color: #FFFFFF;

	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;
	display: flex;
	align-items: center;
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
