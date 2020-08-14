import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

import Icon from "../images/logo.png"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"

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

	handleSubmit = event => {
		event.preventDefault()
		console.log(this.state)
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
							fullWidth
						/>

						<Button
							type="submit"
							className={classes.button}
							variant="contained"
							color="primary"
						>
							Login
						</Button>
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
