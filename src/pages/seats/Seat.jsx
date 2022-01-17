import styled from 'styled-components'

import { seatColors } from '../../factories/seatsFactory'


const Seat = ({ seatInfo, onClick: handleClick }) => {
	const { id, name, status } = seatInfo
	const { background, border } = seatColors(status)
	
	return (
		<CircleSeat
			onClick={() => handleClick({ seatId: id, status })}
			background={background}
			border={border}
		>
			{name}
		</CircleSeat>
	)
}


export default Seat


const seatCircleRadius = '26px'

const CircleSeat = styled.div`
	width: 26px;
	height: 26px;
	margin: calc((90vw - (10 * ${seatCircleRadius})) / (10 * 2));
	display: flex;
	align-items: center;
	justify-content: center;
	background: ${p => p.background};
	border: 1px solid ${p => p.border};
	border-radius: 12px;
	font-size: 11px;
	line-height: 13px;
	letter-spacing: 0.04em;
	color: #000000;
`
