import styled from 'styled-components'

import Seat from './Seat'


const Subtitles = () => {
	const handleSubtitleClick = () => null
	const subtitlesList = [
		{
			status: 'selected',
			subtitle: 'Selecionado',
		},
		{
			status: 'available',
			subtitle: 'Disponível',
		},
		{
			status: 'unavailable',
			subtitle: 'Indisponível',
		},
	]

	const makeSubtitleJSXList = (subtitlesList) => {
		const list = subtitlesList.map(({ status, subtitle }, index) => {
			return (
				<SubtitleBox key={index}>
					<Seat
						seatInfo={{status}}
						onClick={handleSubtitleClick}
					/>
					
					<p>{subtitle}</p>
				</SubtitleBox>
			)
		})
		return list
	}

	return (
		<Container>
			{makeSubtitleJSXList(subtitlesList)}
		</Container>
	)
}


export default Subtitles


const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`

const SubtitleBox = styled.div`
	padding: 5px 15px 0;
	display: flex;
	flex-direction: column;
	align-items: center;

	> p {
		font-style: normal;
		font-weight: normal;
		font-size: 13px;
		line-height: 15px;
		letter-spacing: -0.013em;
		color: #4E5A65;
	}
`
