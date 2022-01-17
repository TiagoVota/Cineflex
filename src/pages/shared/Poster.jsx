import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Poster = ({ filmInfo: { id, title, posterURL }, isMini }) => {
	return (
		<Link to={`/sessoes/${id}`}>
			<Container isMini={isMini}>
				<img src={posterURL} alt={`${title} Poster`}/>
			</Container>
		</Link>
	)
}


export default Poster


const Container = styled.div`
	width: ${p => p.isMini ? 64 : 145}px;
	height: ${p => p.isMini ? 89 : 209}px;
	margin-bottom: ${p => p.isMini ? 0 : 11}px;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
	border-radius: 3px;
	background: #FFFFFF;

	> img {
		width: calc(100% - 16px);
		height: calc(100% - 16px);
	}
`
