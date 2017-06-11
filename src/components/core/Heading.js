import React from 'react'
import classNames from 'classnames'
import styles from './Heading.css'

const Heading = ({ children, size, ...rest }) => (
	<div
		{...rest}
		className={
			classNames(styles.heading, {
				[styles[`size_${size}`]]: size
			})
		}
	>
		{children}
	</div>
)

export default Heading
