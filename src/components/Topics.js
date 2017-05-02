import React, { Component } from 'react'
import styles from './Topics.css'
import { Link } from 'react-router-dom'

const fetchTopics = (cb) => {
	fetch('http://api.pakistanjs.com/playlists')
		.then(res => res.json())
		.then(cb)
}

export default class Topics extends Component {
	constructor(props) {
		super(props)
		this.state = {
			topics: []
		}
	}

	componentDidMount() {
		fetchTopics((topics) => {
			this.setState({ topics })
		})
	}

	render() {
		return (
			<div className={styles.topics}>				
				{this.state.topics.map(({ title, id, desc }) => (
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
}
