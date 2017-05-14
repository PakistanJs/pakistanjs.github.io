import React, { Component } from 'react'
import styles from './Topic.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('topics') @observer
export default class Topic extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedVideo: null,
			videos: []
		}
	}

	componentDidMount() {
		this.props.topics.getTopicVideos(this.props.match.params.id)
	}

	renderVideoFrame() {
		if (this.props.topics.selectedVideo) {
			return (
				<iframe
					className={styles.videoFrame}
					width="800"
					height="450"
					src={this.props.topics.selectedVideo.videoUrl}
					frameBorder="0"
					allowFullScreen
				>
				</iframe>
			)
		}
	}

	renderVideoList() {
		let videoCounter = 1;

		if (this.props.topics.topic && this.props.topics.selectedVideo) {
			return this.props.topics.topic.case({
				pending:   () => <div>Loading...</div>,
				rejected:  error => <div>Ooops..</div>,
				fulfilled: (videos) => (
					<div className={styles.videoList}>
						{videos.map(({ videoUrl, title }) => (
							<a
								href={`#${videoUrl}`}
								className={videoUrl === this.props.topics.selectedVideo.videoUrl && styles.selectedVideo}
								onClick={() => this.props.topics.setSelectedVideo({ videoUrl, title })}>
								<div className={styles.title}>
									<span className={styles.titleCounter}>{videoCounter++}</span>{title}
								</div>
							</a>
						))}
					</div>
				)
			})
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.videoDetail}>
					{this.renderVideoFrame()}
					{this.renderVideoList()}
				</div>
				<div className={styles.topicExtras}>
					<div className={styles.tabs}>
						<div className={`${styles.tab} ${styles.active}`}>Code</div>
						<div className={styles.tab}>References</div>
					</div>
					<div className={styles.tabContent}>
						<a className="jsbin-embed" href="http://jsbin.com/lobiru/1/embed?js,output">JS Bin on jsbin.com</a>
					</div>
				</div>
			</div>
		)
	}
}
