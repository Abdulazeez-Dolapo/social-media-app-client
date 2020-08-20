import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

import Icon from "../images/logo.png"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

// Redux
import { connect } from "react-redux"
import { loginUser } from "../redux/actions/userActions"

const styles = theme => ({
	...theme.customStyles,
})

class login extends Component {
	constructor() {
		super()
		this.state = {
			email: "",
			password: "",
			errors: {},
		}
	}

	handleSubmit = async event => {
		event.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password,
		}
		this.props.loginUser(userData, this.props.history)
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState(state => ({
			...state,
			[name]: value,
		}))
	}

	render() {
		const {
			classes,
			UI: { loading },
		} = this.props
		const { errors } = this.state

		return (
			<Grid container className={classes.formContainer}>
				<Grid item sm />
				<Grid item sm>
					<img src={Icon} alt="react logo" className={classes.image} />
					<Typography variant="h4" className={classes.title}>
						Login
					</Typography>

					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							onChange={this.handleChange}
							label="Email"
							className={classes.textField}
							value={this.state.email}
							helperText={errors.email}
							error={errors.email ? true : false}
							fullWidth
						/>

						<TextField
							id="password"
							name="password"
							type="password"
							onChange={this.handleChange}
							label="Password"
							className={classes.textField}
							value={this.state.password}
							helperText={errors.password}
							error={errors.password ? true : false}
							fullWidth
						/>

						{errors.general && (
							<Typography
								variant="body2"
								className={classes.customError}
							>
								{errors.general}
							</Typography>
						)}

						<Button
							type="submit"
							className={classes.button}
							variant="contained"
							color="primary"
							disabled={loading}
						>
							{loading ? (
								<CircularProgress
									size={20}
									className={classes.progress}
								/>
							) : (
								"Login"
							)}
						</Button>

						<br />
						<span>
							Don't have an account? <Link to="/signup">Sign up</Link>
						</span>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

login.propType = {
	classes: PropTypes.object.isRequired,
	loginUser: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
	user: state.user,
	UI: state.UI,
})

const mapActionToProps = {
	loginUser,
}

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(login))
