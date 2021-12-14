import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
	
  html {
		font-family: 'Roboto', sans-serif;
    background-color: #FFFFFF;
  }
	
	button, input {
		border-width: 0px;
		font-family: 'Roboto', sans-serif;
	}

	a {
		text-decoration: none;
	}
`


export default GlobalStyle
