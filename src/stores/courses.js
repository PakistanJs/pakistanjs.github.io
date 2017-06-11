import customFetch from '../utils/customFetch'
import { fromPromise } from 'mobx-utils'
import { action, when, observable } from 'mobx'

const API_HOST = 'http://localhost:8888/api'
// const API_HOST = 'http://api.pakistanjs.com'

class Course {
	@observable courses = []
	@observable course = {}
	@observable section = {}
	@observable selectedTopic = null

	@action setSelectedTopic = (topic) => {
		this.selectedTopic = topic
	}

	@action fetchCourses() {
		const coursesReponse = fromPromise(customFetch(`${API_HOST}/courses`))

		when(
			() => coursesReponse.state === 'fulfilled',
			() => this.courses = coursesReponse.value
		)

	}

	@action fetchCourse(courseURI) {
		const courseReponse = fromPromise(customFetch(`${API_HOST}/course/${courseURI}`))

		when(
			() => courseReponse.state === 'fulfilled',
			() => this.course = courseReponse.value
		)
	}

	@action fetchCourseSection(courseURI, sectionURI) {
		const sectionResponse = fromPromise(customFetch(`${API_HOST}/course/${courseURI}/${sectionURI}`))

		when(
			() => sectionResponse.state === 'fulfilled',
			() => {
				const section = sectionResponse.value
				this.section = section
				this.selectedTopic = section.topics[0]
			}
		)
	}

	@action addCourse(course) {
		customFetch(`${API_HOST}/course/add`, {
			method: 'POST',
			body: JSON.stringify(course),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		}).then(() => {
			this.fetchCourses()
		})
	}

	@action addSectionToCourse(courseURI, section) {
		const sectionReponse = fromPromise(customFetch(`${API_HOST}/course/${courseURI}/section/add`, {
			method: 'POST',
			body: JSON.stringify(section),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}}))

		when(
			() => sectionReponse.state === 'fulfilled',
			() => this.course = sectionReponse.value
		)
	}

	@action addTopicToSection(sectionURI, topic) {
		const addTopicResponse = fromPromise(customFetch(`${API_HOST}/section/${sectionURI}/topic/add`, {
			method: 'POST',
			body: JSON.stringify(topic),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}}))

		when(
			() => addTopicResponse.state === 'fulfilled',
			() => this.section = addTopicResponse.value
		)
	}
}

export default new Course()
