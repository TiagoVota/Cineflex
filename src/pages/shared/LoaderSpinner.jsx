import Loader from 'react-loader-spinner'
import styled from 'styled-components'


const LoaderSpinner = ({ type, color, height, width }) => {
	return (
		<Container>
			<Loader
				type={type || 'ThreeDots'}
				color={color || '#C3CFD9'}
				height={height || '100'}
				width={width || '100'}
			/>
		</Container>
	)
}


export default LoaderSpinner


const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
