import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
	
  html {
		font-family: 'Roboto', sans-serif;
		font-style: normal;
		font-weight: normal;
    background-color: #FFFFFF;
  }
	
	button, input {
		border-width: 0px;
		font-family: 'Roboto', sans-serif;
		font-style: normal;
		font-weight: normal;
	}

	a {
		text-decoration: none;
	}

	strong {
		font-weight: bold;
	}
`


export default GlobalStyle
