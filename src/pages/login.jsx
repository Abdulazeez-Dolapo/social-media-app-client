import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

import Icon from "../images/logo.png"
import { logIn } from "../services/auth"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = {
	formContainer: {
		textAlign: "center",
	},
	image: {
		margin: "10px auto",
		height: 40,
		width: 40,
	},
	title: {
		margin: "5px auto",
	},
	textField: {
		margin: "5px auto",
	},
	button: {
		marginTop: 10,
		marginBottom: 10,
	},
	customError: {
		color: "red",
		fontSize: "0.8rem",
		marginTop: 10,
	},
}

class login extends Component {
	constructor() {
		super()
		this.state = {
			email: "",
			password: "",
			loading: false,
			errors: [],
		}
	}

	handleSubmit = async event => {
		event.preventDefault()
		try {
			this.setState(state => ({
				...state,
				loading: true,
			}))

			const userData = {
				email: this.state.email,
				password: this.state.password,
			}

			const { data } = await logIn(userData)
			console.log(data)
			this.setState(state => ({
				...state,
				loading: false,
			}))
			this.props.history.replace("/")
		} catch (error) {
			console.log(error.response)
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
}

export default withStyles(styles)(login)
