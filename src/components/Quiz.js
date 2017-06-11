import React, { Component } from 'react'
import styles from './Quiz.css'
import { Paragraph, Heading, Image, Button } from 'components/core'
import { Checkbox } from 'semantic-ui-react'

/*
```quiz
title: hello world
desc: hello world is what and why
option1: option 1
option2: option 2
option3: option 3
answer: option2
answerError: option 1 is correct
```
*/
const extractOptions = (props) => {
	let options = []
	Object.keys(props).forEach(p => {
		if (p.startsWith('option')) options.push({ name: p, value: props[p] })
	})

	return options
}

class Quiz extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleOnChange = (e, o) => {
		this.setState({
			selectedOption: o.name
		})
	}

	handleAnswerSubmit = () => {
		const { selectedOption } = this.state
		const { answer, answerError } = this.props

		if (answer == selectedOption) {
			alert('correct')
		} else {
			alert(answerError)
		}
	}

	renderOption = ({ name, value }) => {
		return (
			<Checkbox
				className={styles.option}
				name={name}
				label={value}
				onChange={this.handleOnChange}
			/>
		)
	}

	renderOptions() {
		const options = extractOptions(this.props)

		return (
			<div className={styles.options}>
				{options.map(this.renderOption)}
			</div>
		)
	}

	render() {
		const { title, desc } = this.props

		return(
			<div className={styles.quiz}>
				<Heading size="medium">{title}</Heading>
				<Paragraph>{desc}</Paragraph>
				{this.renderOptions()}
				<Button onClick={this.handleAnswerSubmit} >Submit</Button>
			</div>
		)
	}
}


export default Quiz
