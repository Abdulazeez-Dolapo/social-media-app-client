import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core"
import CreateMuiTheme from "@material-ui/core/styles/createMuiTheme"
import jwtDecode from "jwt-decode"
import { setAuthorizationHeaders } from "./services/axios"

import styles from "./utils/theme"

// Created Components
import AuthRoute from "./utils/AuthRoute"
import Navbar from "./components/Layout/Navbar"

// Pages
import home from "./pages/home"
import login from "./pages/login"
import signup from "./pages/signup"
import user from "./pages/user"

// Redux
import store from "./redux/store"
import { logoutUser, setUserData } from "./redux/actions/userActions"

const theme = CreateMuiTheme(styles)

const token = localStorage.FBToken
if (token) {
	const decodedToken = jwtDecode(token)
	if (decodedToken.exp * 1000 < Date.now()) {
		store.dispatch(logoutUser())
		window.location.href = "/login"
	} else {
		setAuthorizationHeaders(token)
		store.dispatch(setUserData())
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
						<AuthRoute exact path="/login" component={login} />
						<AuthRoute exact path="/signup" component={signup} />
						<Route exact path="/user/:handle" component={user} />
						<Route
							exact
							path="/user/:handle/tweet/:tweetId"
							component={user}
						/>
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	)
}

export default App
