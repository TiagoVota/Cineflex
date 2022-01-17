// TODO: Olá Thiago, onde que eu enfio essa lindeza aqui? num utils talvez?
const sumPixels = (pixelsArr) => {
	const total = pixelsArr.reduce((acc, cur) => {
		const currNumber = Number(cur.replace('px', ''))
		
		return acc + currNumber
	}, 0)

	return `${total}px`
}


export {
	sumPixels,
}
