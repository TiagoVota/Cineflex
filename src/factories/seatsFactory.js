const makeSeatsList = (seats) => {
	if (!seats?.[0]) return []

	const makeStatus = isAvailable => isAvailable ? 'available' : 'unavailable'
	const makeName = name => name.length === 1 ? `0${name}` : name

	const seatsList = seats.map(({ id, name, isAvailable }) => {
		return {
			id,
			name: makeName(name),
			status: makeStatus(isAvailable)
		}
	})

	return seatsList
}

const seatColors = (status) => {
	const colorStatus = {
		unavailable: {
			background: '#FBE192',
			border: '#F7C52B',
		},
		available: {
			background: '#C3CFD9',
			border: '#808F9D',
		},
		selected: {
			background: '#8DD7CF',
			border: '#45BDB0',
		},
	}

	const colors = {
		background: colorStatus[status].background,
		border: colorStatus[status].border,
	}

	return colors
}

const updateSeatList = ({ seatId, status, seatsList }) => {
	const updateStatus = {
		available: 'selected',
		selected: 'available'
	}

	const updatedSeatList = [...seatsList]
	const toUpdateIndex = updatedSeatList.reduce((wantedIndex, seat, curIndex) => {
		if (seat.id === seatId) return curIndex
		return wantedIndex
	}, 0)
	
	updatedSeatList[toUpdateIndex].status = updateStatus[status]

	return updatedSeatList
}

const selectedSeats = (seatList, type) => {
	const seatsList = seatList
		.filter(({ status }) => status === 'selected')
		.map(seat => seat[type])

	return seatsList
}


export {
	makeSeatsList,
	seatColors,
	updateSeatList,
	selectedSeats,
}
