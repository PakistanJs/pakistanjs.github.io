import React, { Component } from 'react'
import styles from './Courses.css'
import { Link, Route } from 'react-router-dom'

import Topic from './Topic'
import SubjectCard from 'components/SubjectCard'
import TopicCreator from 'components/TopicCreator'
import { Paragraph, Heading, Image, Button } from 'components/core'
import Layout from 'components/Layout'
import AddEdit from 'components/core/bakeEnd/AddEdit'
import createFieldsFromMutation from 'utils/createFieldsFromMutation'
import { gql, graphql, compose } from 'react-apollo'

const getSectionQuery = gql`
	query getSectionQuery($uri: String!) {
		section(uri: $uri) {
			id
			uri
			name
			desc
			topics {
				id
				title
				uri
			}
		}
	}`

const createTopicMutation = gql`
	mutation createTopic($title: String!, $markdown: String!) {
		createTopic(title: $title, markdown: $markdown) {
			id
			title
			uri
		}
	}`

const updateTopicMutation = gql`
	mutation updateTopic($id: ID!, $title: String!, $markdown: String!) {
		updateTopic(id: $id, title: $title, markdown: $markdown) {
			id
			title
			uri
		}
	}`

const updateSectionMutation = gql`
	mutation updateSection($id: ID!, $topics: [ID!]) {
		updateSection(id: $id, topics: $topics) {
			id
			uri
			name
			desc
		}
	}`

@compose(
	graphql(
		getSectionQuery,
		{
			options: ({ match }) => ({ variables: { uri: match.params.sectionURI } })
		}
	),
	graphql(createTopicMutation, { name: 'createTopic' }),
	graphql(updateTopicMutation, {
		name: 'updateTopic',
		options: ({ match }) => ({
			refetchQueries: [{
				query: getSectionQuery,
				variables: { uri: match.params.sectionURI }
			}]
		})
	}),
	graphql(updateSectionMutation, {
		name: 'updateSection',
		options: ({ match }) => ({
			refetchQueries: [{
				query: getSectionQuery,
				variables: { uri: match.params.sectionURI }
			}]
		})
	})
)
class Section extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}

	handleTopicSubmit = () => {
		const { markdown, title } = this.state

		this.props.createTopic({ variables: {
			title,
			markdown
		}})
			.then(({ data }) => {

				const { createTopic } = data
				if (createTopic && createTopic.id) {
					const { section } = this.props.data
					const updatedTopicList = section.topics.map(s => s.id)
					updatedTopicList.push(createTopic.id)
					createTopic && this.props.updateSection({
						variables: {
							id: section.id,
							topics: updatedTopicList
						}
					})
				}
			}).catch((error) => {
				console.log('there was an error sending the query', error)
			})

	}

	renderSection({ name, desc, topics }) {
		return (
			<div className={styles.courseInfo}>
				<Heading>{name}</Heading>
				<Paragraph>{desc}</Paragraph>
				<Heading size="medium">Topics</Heading>
				{topics && this.renderTopics(topics)}
			</div>
		)
	}

	renderTopics(topics) {
		let counter = 1
		const { params } = this.props.match
		return topics.map(({ title, uri }) => (
			<div>
				<Heading size="small">
					<Link to={`/course/${params.courseURI}/${params.sectionURI}/${uri}`}>
						{title}
					</Link>
				</Heading>
			</div>
		))
	}

	renderAddSection(section) {
		return <AddEdit
			title='Manage Topics'
			fields={createFieldsFromMutation(createTopicMutation)}
			items={section.topics}
			onSubmit={(values) => {
				if (values.id) {
					this.props.updateTopic({ variables: values })
				} else {
					this.props.createTopic({ variables: values })
						.then(({ data }) => {

							console.log(data)

							const { createTopic } = data
							if (createTopic && createTopic.id) {
								const { section } = this.props.data
								const updatedTopicList = section.topics.map(s => s.id)
								updatedTopicList.push(createTopic.id)
								createTopic && this.props.updateSection({
									variables: {
										id: section.id,
										topics: updatedTopicList
									}
								})
							}
						}).catch((error) => {
							console.log('there was an error sending the query', error)
						})
				}
			}}
		/>
	}

	render() {
		const { section } = this.props.data

		return (
			<Layout>
				<Layout.Content>
					<Layout.LeftPanel>
						{section && this.renderSection(section)}
					</Layout.LeftPanel>
					<Layout.CenterPanel>
						<div className={styles.sections}>
							<Route path='/course/:courseURI/:sectionURI/:topicURI' component={Topic} />
							<Button onClick={this.handleTopicSubmit}>Submit</Button>
							<Heading>{this.state.title}</Heading>
							<input type="text" onChange={(e) => this.setState({ title: e.target.value })} />
							<TopicCreator onChange={(markdown) => this.setState({ markdown })} />
						</div>
					</Layout.CenterPanel>
				</Layout.Content>
				{section && this.renderAddSection(section)}
			</Layout>
		)
	}
}

export default Section
