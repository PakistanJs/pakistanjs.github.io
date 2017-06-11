import React, { Component } from 'react'
import styles from './Courses.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import SubjectCard from 'components/SubjectCard'
import { Paragraph, Heading, Image } from 'components/core'
import Layout from 'components/Layout'
import AddEdit from 'components/core/bakeEnd/AddEdit'
import createFieldsFromMutation from 'utils/createFieldsFromMutation'
import { gql, graphql, compose } from 'react-apollo'

const getCourseQuery = gql`
	query getCourseQuery($uri: String!) {
		course(uri: $uri) {
			id
			uri
			name
			desc
			sections {
				id
				uri
				name
				desc
			}
			thumb {
				public_id
			}
		}
	}`

const createSectionMutation = gql`
	mutation createSection($name: String!, $desc: String!) {
		createSection(name: $name, desc: $desc) {
			id
			name
			desc
			uri
		}
	}`

const updateSectionMutation = gql`
	mutation updateSection($id: ID!, $name: String!, $desc: String!) {
		updateSection(id: $id, name: $name, desc: $desc) {
			id
			name
			desc
			uri
		}
	}`


const updateCourseMutation = gql`
	mutation updateCourse($id: ID!, $sections: [ID!]) {
		updateCourse(id: $id, sections: $sections) {
			id
			name
			desc
			uri
		}
	}`

@compose(
	graphql(
		getCourseQuery,
		{
			options: ({ match }) => ({ variables: { uri: match.params.courseURI } })
		}
	),
	graphql(createSectionMutation, { name: 'createSection' }),
	graphql(updateSectionMutation, {
		name: 'updateSection',
		options: ({ match }) => ({
			refetchQueries: [{
				query: getCourseQuery,
				variables: { uri: match.params.courseURI }
			}]
		})
	}),
	graphql(updateCourseMutation, {
		name: 'updateCourse',
		options: ({ match }) => ({
			refetchQueries: [{
				query: getCourseQuery,
				variables: { uri: match.params.courseURI }
			}]
		})
	})
)
class ManageCourse extends Component {
	constructor(props) {
		super(props)
		this.handleOnChange = this.handleOnChange.bind(this)

		this.state = {}
	}

	handleOnChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	renderCourse({ name, desc, thumb }) {
		return (
			<div className={styles.courseInfo}>
				<Heading>{name}</Heading>
				<Image src={`http://res.cloudinary.com/pakistanjs-com/image/upload/w_250,h_200,c_fit/${thumb.public_id}`} />
				<Paragraph>{desc}</Paragraph>
			</div>
		)
	}

	renderSections(sections) {
		const { courseURI } = this.props.match.params
		let counter = 1
		return sections.map(({ uri, name, desc }) => (
			<div className={styles.courseSection}>
				<div className={styles.sectionNumber}>{counter++}</div>
				<Link to={`/course/${courseURI}/${uri}`}>
					<SubjectCard title={name} desc={desc} />
				</Link>
			</div>
		))
	}

	renderAddSection() {
		const { course } = this.props.data

		return <AddEdit
			title='Manage Course'
			fields={createFieldsFromMutation(createSectionMutation)}
			items={course.sections}
			onSubmit={(values) => {
				if (values.id) {
					this.props.updateSection({ variables: values })
				} else {
					this.props.createSection({ variables: values })
						.then(({ data }) => {

							const { createSection } = data
							if (createSection && createSection.id) {
								const { course } = this.props.data
								const updatedSectionList = course.sections.map(s => s.id)
								updatedSectionList.push(createSection.id)
								createSection && this.props.updateCourse({
									variables: {
										id: course.id,
										sections: updatedSectionList
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
		const { course } = this.props.data

		return (
			<Layout>
				<Layout.Content>
					<Layout.LeftPanel>
						{course && this.renderCourse(course)}
					</Layout.LeftPanel>
					<Layout.CenterPanel>
						<div className={styles.sections}>
							<Heading>Course Modules</Heading>
							{course && course.sections && this.renderSections(course.sections)}
						</div>
					</Layout.CenterPanel>
				</Layout.Content>
				{course && this.renderAddSection(course)}
			</Layout>
		)
	}
}

export default ManageCourse
