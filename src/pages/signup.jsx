import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

import Icon from "../images/logo.png"
import { signUp, logIn } from "../services/auth"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

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
			loading: false,
			errors: {},
		}
	}

	handleSubmit = async event => {
		event.preventDefault()
		try {
			this.setState(state => ({
				...state,
				loading: true,
			}))

			const newUserData = {
				email: this.state.email,
				password: this.state.password,
				confirmPassword: this.state.confirmPassword,
				handle: this.state.handle,
			}

			await signUp(newUserData)
			const { data } = await logIn({
				email: this.state.email,
				password: this.state.password,
			})
			localStorage.setItem("FBToken", `Bearer ${data.token}`)

			this.setState(state => ({
				...state,
				loading: false,
			}))
			this.props.history.replace("/")
		} catch (error) {
			console.log(error.response.data.error)
			this.setState(state => ({
				...state,
				loading: false,
				errors: error.response.data.error,
			}))
		}
	}

	handleChange = event => {
		const { name, value } = event.target
		this.setState(state => ({
			...state,
			[name]: value,
		}))
	}

	render() {
		const { classes } = this.props
		const { errors, loading } = this.state

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
}

export default withStyles(styles)(signup)
