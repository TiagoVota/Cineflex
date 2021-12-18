import { useState } from 'react'
import PagesRoutes from './Routes'

import OrderContext from './contexts/OrderContext'


const App = () => {
	const [orderInfo, setOrderInfo] = useState({})
	
	return (
		<OrderContext.Provider value={{orderInfo, setOrderInfo}}>
			<PagesRoutes />
		</OrderContext.Provider>
	)
}


export default App
