import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

// Image
import Icon from "../images/logo.png"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

// Redux
import { connect } from "react-redux"
import { userSignup } from "../redux/actions/userActions"

const styles = theme => ({
	...theme.customStyles,
})

class signup extends Component {
	constructor() {
		super()
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			handle: "",
		}
	}

	handleSubmit = async event => {
		event.preventDefault()
		const newUserData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			handle: this.state.handle,
		}

		this.props.userSignup(newUserData, this.props.history)
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
			UI: { errors, loading },
		} = this.props

		return (
			<Grid container className={classes.formContainer}>
				<Grid item sm />
				<Grid item sm>
					<img src={Icon} alt="react logo" className={classes.image} />
					<Typography variant="h4" className={classes.title}>
						Sign Up
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
							id="handle"
							name="handle"
							type="text"
							onChange={this.handleChange}
							label="Handle"
							className={classes.textField}
							value={this.state.handle}
							helperText={errors.handle}
							error={errors.handle ? true : false}
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

						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							onChange={this.handleChange}
							label="Confirm Password"
							className={classes.textField}
							value={this.state.confirmPassword}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
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
								"Signup"
							)}
						</Button>

						<br />
						<span>
							Already have an account? <Link to="/login">Login</Link>
						</span>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		)
	}
}

signup.propType = {
	classes: PropTypes.object.isRequired,
	UI: PropTypes.func.isRequired,
	user: PropTypes.func.isRequired,
	userSignup: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
	UI: state.UI,
	user: state.user,
})

const mapActionToProps = {
	userSignup,
}

export default connect(
	mapStateToProps,
	mapActionToProps
)(withStyles(styles)(signup))
