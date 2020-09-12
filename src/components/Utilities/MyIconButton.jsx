import React from "react"

// Material UI
import ToolTip from "@material-ui/core/Tooltip"
import IconButton from "@material-ui/core/IconButton"

export default ({
	children,
	toolTipTitle,
	toolTipClass,
	onClick,
	buttonClass,
}) => (
	<ToolTip title={toolTipTitle} className={toolTipClass} placement="top">
		<IconButton onClick={onClick} className={buttonClass}>
			{children}
		</IconButton>
	</ToolTip>
)
