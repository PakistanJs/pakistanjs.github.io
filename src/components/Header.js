import React from 'react'
import styles from './Header.css'
import { Link } from 'react-router-dom'

const Header = () => (
	<div className={styles.header}>
		<div className={styles.headerInner}>
			<Link to='/'>
				<img className={styles.logo} src={require('./logo.jpg')} alt="Pakistan.JS"/>
			</Link>
			<div className={styles.slogan}>
				<h3>PAKISTAN.JS</h3>
				<p>Share &amp; Learn Web/Mobile/IoT Development</p>
			</div>
		</div>
	</div>
)

export default Header
