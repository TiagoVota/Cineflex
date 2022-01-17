import styled from 'styled-components'

import Poster from '../shared/Poster'


const Films = ({ filmsList }) => {
	return (
		<Container>
			{
				filmsList.map((filmInfo, index) => <Poster
					key={index}
					filmInfo={filmInfo}
				/>)
			}
		</Container>
	)
}


export default Films


const Container = styled.div`
	width: 90vw;
	margin: 0 0 10vw 5vw;
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
`
