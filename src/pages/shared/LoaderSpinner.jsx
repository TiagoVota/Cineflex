import Loader from 'react-loader-spinner'
import styled from 'styled-components'


const LoaderSpinner = ({ type, color, height, width, heightDiscount }) => {
	return (
		<Container heightDiscount={heightDiscount || '0px'}>
			<Loader
				type={type || 'ThreeDots'}
				color={color || '#C3CFD9'}
				height={height || width || '100'}
				width={width || height || '100'}
			/>
		</Container>
	)
}


export default LoaderSpinner


const Container = styled.div`
	height: calc(100% - ${p => p.heightDiscount});
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`
