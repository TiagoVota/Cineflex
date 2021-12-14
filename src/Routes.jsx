import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ResetStyleCSS from './styles/ResetStyleCSS'
import GlobalStyle from './styles/GlobalStyle'
import Homepage from './pages/homepage'
import Seats from './pages/seats'
import Sessions from './pages/sessions'
import FinalizeOrder from './pages/finalizeOrder'


const PagesRoutes = () => {
	<Router>
		<ResetStyleCSS />
		<GlobalStyle />

		<Routes>
			<Route path='/login' element={<Homepage />} />
			<Route path='/sign-up' element={<Seats />} />
			<Route path='/' element={<Sessions />} />
			<Route path='/new-entry' element={<FinalizeOrder />} />
		</Routes>
	</Router>
}


export default PagesRoutes
