import styled from 'styled-components'

import LoaderSpinner from './LoaderSpinner'
import Poster from './Poster'


const Footer = ({ filmInfo, isLoading }) => {
	const { title, time, weekday } = filmInfo

	const makeSessionStr = (time, weekday) => {
		return (time && weekday) ? `${time} - ${weekday}` : ''
	}
	
	return (
		<Container>
			{
				isLoading
					? <LoaderSpinner />
					: <>
						<PosterContainer>
							<Poster filmInfo={filmInfo} isMini />
						</PosterContainer>

						<DescriptionContainer>
							<p>{title}</p>
							<p>{makeSessionStr(time, weekday)}</p>
						</DescriptionContainer>
					</>
			}
		</Container>
	)
}


export default Footer
export {
	footerHeight,
}


const footerHeight = '117px'

const Container = styled.div`
	width: 100vw;
	height: ${footerHeight};
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
		font-size: 26px;
		line-height: 30px;
		display: flex;
		align-items: center;
		color: #293845;
	}
`
