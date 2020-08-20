import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core"
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme"
import jwtDecode from "jwt-decode"

import styles from "./utils/theme"
import { AuthRoute } from "./utils/AuthRoute"

import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"

import Navbar from "./components/Navbar"

const theme = CreateMuiTheme(styles)

const token = localStorage.FBToken
let authenticated

if (token) {
	const decodedToken = jwtDecode(token)
	if (decodedToken.exp * 1000 < Date.now()) {
		window.location.href = "/login"
		authenticated = false
	} else {
		authenticated = true
	}
}

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<Navbar />
				<div className="container">
					<Switch>
						<Route exact path="/" component={home} />
						<AuthRoute
							exact
							path="/login"
							component={login}
							authenticated={authenticated}
						/>
						<AuthRoute
							exact
							path="/signup"
							component={signup}
							authenticated={authenticated}
						/>
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	)
}

export default App
