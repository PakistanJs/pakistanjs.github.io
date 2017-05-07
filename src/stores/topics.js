import customFetch from '../utils/customFetch'
import { fromPromise } from 'mobx-utils'
import { action, when, observable } from 'mobx'

class Topics {
	@observable list;
	@observable topic;
	@observable selectedVideo;

	constructor() {
		this.list = fromPromise(customFetch('http://api.pakistanjs.com/playlists'))
	}

	@action getTopicVideos(topicId) {
		this.topic = fromPromise(customFetch(`http://api.pakistanjs.com/${topicId}/list`))

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

