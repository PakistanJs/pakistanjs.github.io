import React, { Component } from 'react'
import styles from './Topic.css'

import PreviewMarkdown from 'components/PreviewMarkdown'
import { Paragraph, Heading, Image, Button } from 'components/core'
import Layout from 'components/Layout'
import AddEdit from 'components/core/bakeEnd/AddEdit'
import createFieldsFromMutation from 'utils/createFieldsFromMutation'
import { gql, graphql, compose } from 'react-apollo'

const getTopicQuery = gql`
	query topic($uri: String!) {
		topic(uri: $uri) {
			id
			title
			uri
			markdown
		}
	}`

@graphql(
	getTopicQuery,
	{
		options: ({ match }) => ({ variables: { uri: match.params.topicURI } })
	}
)
class Topic extends Component {
	render() {
		const { topic } = this.props.data

		if (!topic) {
			return <div>Loading topic ...</div>
		}

		return (
			<div className={styles.sections}>
				<Heading>{topic.title}</Heading>
				<PreviewMarkdown>{topic.markdown}</PreviewMarkdown>
			</div>
		)
	}
}

export default Topic
