import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import ReturnButton from './ReturnButton'


const Header = () => {
	const navigate = useNavigate()

	const handleClick = () => navigate('/')
	
	return (
		<Container>
			<ReturnButton />
			
			<Title onClick={handleClick}>CINEFLEX</Title>
		</Container>
	)
}


export default Header


const headerHeight = '67px'

const Container = styled.div`
	height: ${headerHeight};
	width: 100vw;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #C3CFD9;
`

const Title = styled.h1`
	padding: calc((${headerHeight} - 40px) / 2) 20px;
	font-style: normal;
	font-weight: normal;
	font-size: 34px;
	line-height: 40px;
	color: #E8833A;
`
