import React, { Component } from 'react'
import styles from './Home.css'
import Topics from './Topics'
import { Link } from 'react-router-dom'

export default class Home extends Component {
	componentDidMount() {
		const script = document.createElement('script')
		script.id = 'typef_orm_share'
		script.src = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/share.js'
		setTimeout(() => {
			document.getElementsByTagName('head')[0].appendChild(script)
		}, 5)
	}

	render() {
		return (
			<div className={styles.home}>
				<div className={styles.container}>
					<div className={styles.hero}>
						<div className={styles.heroHeading}>
							Learn Web/Mobile development for Free
						</div>
						<div className={styles.heroLinks}>
							<Link className={styles.heroLink} to='/topics'>Start Learning (it's free)</Link>
							<a
								className={`${styles.heroLink} typeform-share button`}
								href="https://sarmadsangi.typeform.com/to/nHzQSU"
								data-mode="popup"
								data-hide-headers={true}
								data-hide-footer={true}
								target="_blank">
								Experts, join us here (Let's help others)
							</a>
						</div>
					</div>
				</div>
				<Topics />
			</div>
		)
	}
}
