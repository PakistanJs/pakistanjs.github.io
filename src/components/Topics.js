import React, { Component } from 'react'
import styles from './Topics.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('topics') @observer
class Topics extends Component {
	renderTopics(topics) {
		return (
			<div className={styles.topics}>
				{topics.map(({ title, id, desc }) => (
					<Link to={`/topic/${id}`}>
						<div className={styles.topic}>
							<div className={styles.topicHeading}>{title}</div>
							<div className={styles.topicDesc}>{desc}</div>
						</div>
					</Link>
				))}
			</div>
		)
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.topicsHeader}>Start Learning</div>
				{this.props.topics.list.case({
					pending:   () => <div className={styles.topics}>Loading...</div>,
					rejected:  error => <div className={styles.topics}>Ooops..</div>,
					fulfilled: this.renderTopics
				})}
			</div>
		)
	}
}

export default Topics

