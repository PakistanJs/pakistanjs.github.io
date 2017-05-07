import React, { Component } from 'react'
import styles from './Home.css'
import Topics from './Topics'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	render() {
		return (
			<div className={styles.home}>
				<div className={styles.container}>
					<div className={styles.hero}>
						<div className={styles.heroHeading}>
							Learn Web/Mobile development for Free
						</div>
						<div className={styles.heroLinks}>
							<Link className={styles.heroLink} to='/topics'>Learners, start here</Link>
							<Link className={styles.heroLink} to='/experts'>Experts, join us here</Link>
						</div>
					</div>
				</div>
				<Topics />
			</div>
		)
	}
}
