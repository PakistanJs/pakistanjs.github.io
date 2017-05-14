import React, { Component } from 'react'
import styles from './ManageCourses.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('sections')
@observer
export default class ManageSections extends Component {
	constructor(props) {
		super(props)
		this.handleOnChange = this.handleOnChange.bind(this)

		this.state = {}
	}

	componentDidMount() {
		this.props.sections.fetchSections()
	}

	handleOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	renderSections(sections) {
		return sections.map((course) => <div>{sections.name}</div>)
	}

	renderAddSection() {
		return (
			<div>
				<input
					onChange={this.handleOnChange}
					name='name'
					value={this.state.name}
					placeholder='Section Name' />
				<input
					onChange={this.handleOnChange}
					name='desc'
					value={this.state.desc}
					placeholder='Section Description' />
				<a onClick={() => {
					this.props.sections.addSection(this.state)
					this.setState({ name: '', desc: '' })
				}}>Add Section</a>
			</div>
		)
	}

	render() {
		const { sections } = this.props

		return (
			<div className={styles.container}>
				{this.renderSections(sections.sections)}
				{this.renderAddSection()}
			</div>
		)
	}
}
