import styled from 'styled-components'


const Header = () => {
	return (
		<Container>
			<H1>CINEFLEX</H1>
		</Container>
	)
}


export default Header


const Container = styled.div`
	height: 67px;
	width: 100vw;
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #C3CFD9;
`

const H1 = styled.h1`
	font-style: normal;
	font-weight: normal;
	font-size: 34px;
	line-height: 40px;
	color: #E8833A;
`
