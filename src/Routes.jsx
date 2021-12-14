import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ResetStyleCSS from './styles/ResetStyleCSS'
import GlobalStyle from './styles/GlobalStyle'
import Homepage from './pages/homepage'
import Seats from './pages/seats'
import Sessions from './pages/sessions'
import FinalizeOrder from './pages/finalizeOrder'


const PagesRoutes = () => {
	return (
		<Router>
			<ResetStyleCSS />
			<GlobalStyle />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/sessoes/:filmId' element={<Seats />} />
				<Route path='/assentos/:sessionId' element={<Sessions />} />
				<Route path='/sucesso' element={<FinalizeOrder />} />
			</Routes>
		</Router>
	)
}


export default PagesRoutes
