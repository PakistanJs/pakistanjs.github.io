import React, { Component } from 'react'
import VideoWidget from './VideoWidget'

const fetchVideos = (playlistId, cb) => {
	fetch(`http://api.pakistanjs.com/${playlistId}/list`)
		.then(res => res.json())
		.then(cb)
}

export default class VideoList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			videos: null
		}
	}

	componentDidMount() {
		fetchVideos(this.props.match.params.id, (videos) => {
			this.setState({ videos })
		})
	}

	componentWillReceiveProps(props) {
		fetchVideos(props.match.params.id, (videos) => {
			this.setState({ videos })
		})
	}

	renderVideoWidget(videos) {
		const videoWidgets = videos.map(video => <VideoWidget {...video} />)

		return (
			<div>
				{videoWidgets}
			</div>
		)
	}

	render() {
		const { videos } = this.state

		return (
			<div>
				{videos ? this.renderVideoWidget(videos) : 'Loading...'}
			</div>
		)
	}
}
