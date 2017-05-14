import customFetch from '../utils/customFetch'
import { fromPromise } from 'mobx-utils'
import { action, when, observable } from 'mobx'

const API_HOST = 'http://localhost:8888/api'
// const API_HOST = 'http://api.pakistanjs.com'

class Topics {
	@observable list;
	@observable topic;
	@observable selectedVideo;

	constructor() {
		this.list = fromPromise(customFetch(`${API_HOST}/playlists`))
	}

	@action getTopicVideos(topicId) {
		this.selectedVideo = null;
		this.topic = fromPromise(customFetch(`${API_HOST}/${topicId}/list`))

		when(
			() => this.topic.state === 'fulfilled',
			() => this.selectedVideo = this.topic.value[0]
		)
	}

	@action setSelectedVideo(selectedVideo) {
		this.selectedVideo = selectedVideo
	}
}

export default new Topics()

