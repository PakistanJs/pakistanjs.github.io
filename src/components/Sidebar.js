import React from 'react'
import styles from './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = ({ items }) => (
	<div className={styles.sidebar}>
		<div className={styles.header}>Topics</div>
		<div className={styles.items}>
			{items && items.map(({ uri, name }) => <Link to={uri}>{name}</Link>)}
		</div>
	</div>
)

export default Sidebar
