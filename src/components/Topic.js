import React, { Component } from 'react'
import styles from './Topic.css'
import { Link } from 'react-router-dom'

const fetchVideos = (playlistId, cb) => {
	fetch(`http://api.pakistanjs.com/${playlistId}/list`)
		.then(res => res.json())
		.then(cb)
}

export default class Topic extends Component {
	constructor(props) {
		super(props)
		this.state = {
			videos: [],
			selectedVideo: null
		}
	}

	componentDidMount() {
		fetchVideos(this.props.match.params.id, (videos) => {
			this.setState({
				videos,
				selectedVideo: videos[0]
			})
		})
	}

	componentWillReceiveProps(props) {
		fetchVideos(props.match.params.id, (videos) => {
			this.setState({ videos })
		})
	}

	renderVideoFrame() {
		if (this.state.selectedVideo) {
			return <iframe width="800" height="450" src={this.state.selectedVideo.videoUrl} frameBorder="0" allowFullscreen></iframe>
		}
	}

	render() {
		return (
			<div className={styles.container}>
				<div className={styles.videoDetail}>
					{this.renderVideoFrame()}
					<div className={styles.videoList}>
						{this.state.videos.map(({ videoUrl, title, desc }) => (
							<a
								href={`#${videoUrl}`}
								className={videoUrl === this.state.selectedVideo.videoUrl && styles.selectedVideo}
								onClick={() => {
									this.setState({
										selectedVideo: { videoUrl, title, desc }
									})
								}}>
								<div className={styles.title}>{title}</div>
							</a>
						))}
					</div>
				</div>
				<div className={styles.topicExtras}>
					<div className={styles.tabs}>
						<div className={`${styles.tab} ${styles.active}`}>Code</div>
						<div className={styles.tab}>References</div>
					</div>
					<div className={styles.tabContent}>
						<a className="jsbin-embed" href="http://jsbin.com/lobiru/embed?js,console">JS Bin on jsbin.com</a>
					</div>
				</div>
			</div>
		)
	}
}
