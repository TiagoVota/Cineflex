import styled from 'styled-components'

import { headerHeight } from '../shared/Header'
import { footerHeight } from '../shared/Footer'

import { sumPixels } from '../../utils/cssUtils'


const PageContainer = ({ children, haveHeader, haveFooter }) => {
	const heightDiscounts = [
		haveHeader ? headerHeight : '0px',
		haveFooter ? footerHeight : '0px'
	]

	return (
		<Container
			marginTop={haveHeader ? headerHeight : '0px'}
			heightDiscount={sumPixels(heightDiscounts)}
		>
			{children}
		</Container>
	)
}


export default PageContainer


const Container = styled.div`
	height: calc(100vh - ${p => p.heightDiscount});
	width: 100vw;
	margin-top: ${p => p.marginTop};
	overflow-y: scroll;
`
