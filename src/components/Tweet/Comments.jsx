import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"

// Third party Libraries
import dayjs from "dayjs"

// Material UI components
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

const styles = theme => ({
	...theme.customStyles,
	commentImage: {
		maxWidth: "100%",
		height: 100,
		objectFit: "cover",
		borderRadius: "50%",
	},
	commentData: {
		marginLeft: 20,
	},
})

class Comments extends Component {
	render() {
		const { comments, classes } = this.props

		return (
			<Grid container>
				{comments?.length > 0
					? comments.map((comment, index) => {
							const { body, createdAt, userImage, userHandle } = comment

							return (
								<Fragment key={createdAt}>
									<Grid item sm={12}>
										<Grid container>
											<Grid item sm={2}>
												<img
													src={userImage}
													alt="user"
													className={classes.commentImage}
												/>
											</Grid>

											<Grid item sm={9}>
												<div className={classes.commentData}>
													<Typography
														component={Link}
														to={`/users/${userHandle}`}
														variant="h5"
														color="primary"
													>
														{userHandle}
													</Typography>

													<Typography
														color="textSecondary"
														variant="body2"
													>
														{dayjs(createdAt).format(
															"h:mm a, MMMM DD YYYY"
														)}
													</Typography>

													<hr
														className={classes.invisibleSeparator}
													/>

													<Typography variant="body1">
														{body}
													</Typography>
												</div>
											</Grid>
										</Grid>
									</Grid>

									{index < comments.length - 1 ? (
										<hr className={classes.visibleSeparator} />
									) : (
										""
									)}
								</Fragment>
							)
					  })
					: null}
			</Grid>
		)
	}
}

Comments.propTypes = {
	comments: PropTypes.array.isRequired,
	classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Comments)
