import React, { Component } from "react"
import { Grid } from "@material-ui/core"

class home extends Component {
	render() {
		return (
			<Grid container spacing={10}>
				<Grid item xs={12} sm={8}>
					<p> Content</p>
				</Grid>

				<Grid item xs={12} sm={4}>
					<p>Profile</p>
				</Grid>
			</Grid>
		)
	}
}

export default home
