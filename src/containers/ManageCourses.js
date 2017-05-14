import React, { Component } from 'react'
import styles from './ManageCourses.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('courses')
@observer
export default class ManageCourses extends Component {
	constructor(props) {
		super(props)
		this.handleOnChange = this.handleOnChange.bind(this)

		this.state = {}
	}

	componentDidMount() {
		this.props.courses.fetchCourses()
	}

	handleOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	renderCourses(courses) {
		return courses.map((course) => <div>{course.name}</div>)
	}

	renderAddCourse() {
		return (
			<div>
				<input
					onChange={this.handleOnChange}
					name='name'
					value={this.state.name}
					placeholder='Course Name' />
				<input
					onChange={this.handleOnChange}
					name='desc'
					value={this.state.desc}
					placeholder='Course Description' />
				<a onClick={() => {
					this.props.courses.addCourse(this.state)
					this.setState({ name: '', desc: '' })
				}}>Add Course</a>
			</div>
		)
	}

	render() {
		const { courses } = this.props

		return (
			<div className={styles.container}>
				{this.renderCourses(courses.courses)}
				{this.renderAddCourse()}
			</div>
		)
	}
}
