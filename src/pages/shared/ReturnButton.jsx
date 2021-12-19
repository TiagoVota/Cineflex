import { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import OrderContext from '../../contexts/OrderContext'

import ReturnIcon from './ReturnIcon'


const ReturnButton = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { orderInfo } = useContext(OrderContext)
	/*
		TODO: Olá Thiago! Então, sou uma pessoa que gosta muito de usar o destruc-
		turing para tudo (falo isso porque sei que o que vou pedir dá para resol-
		ver utilizando optional chain). Me deparei com o problema da linha abaixo
		de tentar desestruturar um undefined (e isso acontece bastante também quan-
		do estou trabalhando com local storage, por causa do delay dele). Essa for-
		ma que fiz, de colocar uma atribuição padrão "={}", é o melhor jeito que
		tenho para contornar isso? Ou tens uma ideia melhor de como resolver?
	*/
	const { filmInfo: { id, sessionId }={} } = orderInfo
	const buttonDisplay = pathname === '/' ? 'none' : 'flex'

	const handleClick = () => {
		navigate(makeRedirectPath({ pathname, id, sessionId }))
	}

	const makeRedirectPath = ({ pathname, id, sessionId }) => {
		const pathToRedirect = {
			sessoes: '/',
			assentos: `/sessoes/${id}`,
			sucesso: `/assentos/${sessionId}`,
		}
		const currentRoute = pathname.split('/')[1]

		return pathToRedirect[currentRoute] || '/'
	}

	return (
		<Button display={buttonDisplay} onClick={handleClick}>
			<ReturnIcon />
		</Button>
	)
}

export default ReturnButton


const Button = styled.button`
	position: absolute;
	left: 8vw;
	width: 40px;
	height: 25px;
	display: ${p => p.display};
	align-items: center;
	justify-content: center;
	background: #7B8B99;
	border-radius: 3px;
`
