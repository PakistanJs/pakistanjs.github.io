import React, { Component } from 'react'
import styles from './TopicCreator.css'
import PreviewMarkdown from 'components/PreviewMarkdown'
import Button from 'components/core/Button'

class TopicCreator extends Component {
	constructor(props) {
		super(props)
		this.state = {
			preview: false
		}
	}

	showEditor = () => this.setState({ preview: false })

	showPreview = () => this.setState({ preview: true })

	handleOnChange = (e) => {
		this.setState({ content: e.target.value })
		this.props.onChange(e.target.value)
	}

	renderEditor() {
		return (
			<textarea
				className={styles.editor}
				onChange={this.handleOnChange}
				value={this.state.content}
				rows="30"
			></textarea>
		)
	}

	render() {
		return (
			<div>
				<div className={styles.buttons}>
					<Button onClick={this.showEditor}>Edit</Button>
					<Button onClick={this.showPreview}>Preview</Button>
				</div>
				<div className={styles.contentPane}>
					{this.state.preview ? <PreviewMarkdown>{this.state.content}</PreviewMarkdown> : this.renderEditor()}
				</div>
			</div>
		)
	}
}

export default TopicCreator
