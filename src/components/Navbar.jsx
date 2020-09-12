import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

// My Created Components
import MyIconButton from "./Utilities/MyIconButton"

// Material UI
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"

// Icons
import AddIcon from "@material-ui/icons/Add"
import HomeIcon from "@material-ui/icons/Home"
import NotificationsIcon from "@material-ui/icons/Notifications"

// Redux
import { connect } from "react-redux"

class Navbar extends Component {
	render() {
		const { authenticated } = this.props

		return (
			<AppBar>
				<Toolbar className="nav-container">
					{authenticated ? (
						<Fragment>
							<MyIconButton
								// buttonClass="button"
								// onClick={this.handleClickOpen}
								toolTipTitle="Post a Tweet"
							>
								<AddIcon color="primary" />
							</MyIconButton>

							<Link to="/">
								<MyIconButton
									// buttonClass="button"
									// onClick={this.handleClickOpen}
									toolTipTitle="Home"
								>
									<HomeIcon color="primary" />
								</MyIconButton>
							</Link>

							<MyIconButton
								// buttonClass="button"
								// onClick={this.handleClickOpen}
								toolTipTitle="Notifications"
							>
								<NotificationsIcon color="primary" />
							</MyIconButton>
						</Fragment>
					) : (
						<Fragment>
							<Button color="inherit" component={Link} to="/">
								Home
							</Button>
							<Button color="inherit" component={Link} to="/login">
								Login
							</Button>
							<Button color="inherit" component={Link} to="/signup">
								Signup
							</Button>
						</Fragment>
					)}
				</Toolbar>
			</AppBar>
		)
	}
}

Navbar.propTypes = {
	authenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
	authenticated: state.user.authenticated,
})

export default connect(mapStateToProps)(Navbar)
