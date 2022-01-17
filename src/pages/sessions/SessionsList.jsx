import Session from './Session'


const SessionsList = ({ days }) => {
	return (
		<>
			{
				days.map((sessionInfo, index) => <Session
					key={index}
					sessionInfo={sessionInfo}
				/>)
			}
		</>
	)
}


export default SessionsList
