import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ResetStyleCSS from './styles/ResetStyleCSS'
import GlobalStyle from './styles/GlobalStyle'

import Header from './pages/shared/Header'
import Homepage from './pages/homepage'
import Seats from './pages/seats'
import Sessions from './pages/sessions'
import FinalizeOrder from './pages/finalizeOrder'


const PagesRoutes = () => {
	return (
		<Router>
			<ResetStyleCSS />
			<GlobalStyle />

			<Header />

			<Routes>
				<Route path='/' element={<Homepage />} />
				<Route path='/sessoes/:filmId' element={<Sessions />} />
				<Route path='/assentos/:sessionId' element={<Seats />} />
				<Route path='/sucesso' element={<FinalizeOrder />} />
			</Routes>
		</Router>
	)
}


export default PagesRoutes
