import styled from 'styled-components'


const PageTitle = ({ text, isSuccessPage }) => {
	return (
		<Title isSuccessPage={isSuccessPage} >
			<h2>{text}</h2>
		</Title>
	)
}


export default PageTitle
export {
	titleHeight,
}


const titleHeight = '110px'

const Title = styled.div`
	height: ${titleHeight};
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;

	> h2 {
		font-weight: ${p => p.isSuccessPage ? 'bold' : 'normal'};
		font-size: 24px;
		line-height: 28px;
		letter-spacing: 0.04em;
		color: ${p => p.isSuccessPage ? '#247A6B' : '#293845'};
	}
`
