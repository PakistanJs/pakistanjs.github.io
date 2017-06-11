import React from 'react'
import styles from './Label.css'

const Label = ({ children }) => (
	<div className={styles.label}>
    {children}
	</div>
)

export default Label
