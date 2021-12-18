import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'


const Session = ({ sessionInfo }) => {
	const navigate = useNavigate()
	const { showtimes, weekday, date } = sessionInfo

	const handleClick = sessionId => navigate(`/assentos/${sessionId}`)
	
	return (
		<Container>
			<h3>{`${weekday} - ${date}`}</h3>

			<TimesContainer>
				{
					showtimes.map(({ name: time, id }, index) => <Button
						key={index}
						onClick={() => handleClick(id)}
					>{time}</Button>
					)
				}
			</TimesContainer>
		</Container>
	)
}


export default Session


const Container = styled.div`
	width: 100vw;
	padding: 0 0 23px 23px;

	> h3 {
		font-style: normal;
		font-weight: normal;
		font-size: 20px;
		line-height: 23px;
		letter-spacing: 0.02em;
		color: #293845;
	}
`

const TimesContainer = styled.div`
	width: 100%;
	margin-top: 23px;
	display: flex;
	flex-wrap: wrap;
`

const Button = styled.button`
	width: 83px;
	height: 43px;
	margin-right: 8px;
	border-radius: 3px;
	background: #E8833A;
	font-style: normal;
	font-weight: normal;
	font-size: 18px;
	line-height: 21px;
	letter-spacing: 0.02em;
	color: #FFFFFF;
`
