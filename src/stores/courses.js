import customFetch from '../utils/customFetch'
import { fromPromise } from 'mobx-utils'
import { action, when, observable } from 'mobx'

const API_HOST = 'http://localhost:8888/api'
// const API_HOST = 'http://api.pakistanjs.com'

class Course {
	@observable courses = [];

	@action fetchCourses() {
		const coursesReponse = fromPromise(customFetch(`${API_HOST}/courses`))

		when(
			() => coursesReponse.state === 'fulfilled',
			() => this.courses = coursesReponse.value
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

	@action addSectionToCourse() {
		
	}
}

export default new Course()
