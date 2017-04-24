import React from 'react'
import styles from './Header.css'

const Header = () => (
	<div className={styles.header}>
		<div className={styles.headerInner}>
			<img className={styles.logo} src={require('./logo.jpg')} alt="Pakistan.JS"/>
			<div className={styles.slogan}>
				<h3>PAKISTAN.JS</h3>
				<p>Share &amp; Learn Web/Mobile/IoT Development</p>
			</div>
		</div>
	</div>
)

export default Header
