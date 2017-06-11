import React from 'react'
import styles from './Heading.css'

const Button = ({ children, ...rest }) => (
	<a className={styles.button} {...rest} >
    {children}
	</a>
)

export default Button
