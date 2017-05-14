import customFetch from '../utils/customFetch'
import { fromPromise } from 'mobx-utils'
import { action, when, observable } from 'mobx'

const API_HOST = 'http://localhost:8888/api'
// const API_HOST = 'http://api.pakistanjs.com'

class User {
	@observable userResponse;
	@observable currentUser;

	constructor() {
		this.userResponse = fromPromise(customFetch(`${API_HOST}/user`))

		when(
			() => this.userResponse.state === 'fulfilled',
			() => this.currentUser = this.userResponse.value
		)

		when(
			() => this.userResponse.state === 'rejected',
			() => this.currentUser = null
		)
	}
}

export default new User()
