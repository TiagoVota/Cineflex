import styled from 'styled-components'

import Poster from './Poster'


const Footer = ({ filmInfo }) => {
	const { title, time, weekday } = filmInfo

	const makeSessionStr = (time, weekday) => {
		return (time && weekday) ? `${time} - ${weekday}` : ''
	}
	
	return (
		<Container>
			<PosterContainer>
				<Poster filmInfo={filmInfo} isMini />
			</PosterContainer>

			<DescriptionContainer>
				<p>{title}</p>
				<p>{makeSessionStr(time, weekday)}</p>
			</DescriptionContainer>
		</Container>
	)
}


export default Footer


const Container = styled.div`
	width: 100vw;
	height: 117px;
	position: absolute;
	left: 0px;
	bottom: 0px;
	display: flex;
	align-items: center;
	background: #DFE6ED;
	border: 1px solid #9EADBA;
`

const PosterContainer = styled.div`
	margin: 0 14px 0 11px;
`

const DescriptionContainer = styled.div`
	> p {
		font-style: normal;
		font-weight: normal;
		font-size: 26px;
		line-height: 30px;
		display: flex;
		align-items: center;
		color: #293845;
	}
`
