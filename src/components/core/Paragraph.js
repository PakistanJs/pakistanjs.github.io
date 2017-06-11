import React from 'react'
import styles from './Paragraph.css'

const Paragraph = ({ children }) => (
	<p className={styles.paragraph}>
    {children}
	</p>
)

export default Paragraph
