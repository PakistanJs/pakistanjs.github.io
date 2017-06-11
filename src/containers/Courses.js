import React, { Component } from 'react'
import styles from './Courses.css'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import Card from 'components/Card'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Layout from 'components/Layout'
import { Heading } from 'components/core'
import createFieldsFromMutation from 'utils/createFieldsFromMutation'
import AddEdit from 'components/core/bakeEnd/AddEdit'
import { gql, graphql, compose } from 'react-apollo'

const listCoursesQuery = gql`
	query RootQuery {
		listCourses {
			id
			name
			desc
			uri
			thumb {
				public_id
				url
			}
		}
	}`

const createCourseMutation = gql`
	mutation createCourse($name: String!, $desc: String!, $thumb: ImageInput!) {
		createCourse(name: $name, desc: $desc, thumb: $thumb) {
			id
			name
			desc
			uri
			thumb {
				public_id
				url
			}
		}
	}`

const updateCourseMutation = gql`
	mutation updateCourse($id: ID!, $name: String!, $desc: String!, $thumb: ImageInput!) {
		updateCourse(id: $id, name: $name, desc: $desc, thumb: $thumb) {
			id
			name
			desc
			uri
			thumb {
				public_id
				url
			}
		}
	}`

@compose(
	graphql(listCoursesQuery),
	graphql(createCourseMutation,
		{
			name: 'createCourse',
			options: {
				refetchQueries: [{
					query: listCoursesQuery,
				}]
			}
		}
	),
	graphql(updateCourseMutation,
		{
			name: 'updateCourse',
			options: {
				refetchQueries: [{
					query: listCoursesQuery,
				}]
			}
		}
	),
)
export default class ManageCourses extends Component {
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

	renderCourses(courses) {
		return (
			<div className={styles.block}>
				<div className={styles.courseList}>
					{courses.map(({ name, desc, uri, thumb }) => (
						<Link to={`/course/${uri}`}>
							<Card imgSrc={`http://res.cloudinary.com/pakistanjs-com/image/upload/w_250,h_200,c_fit/${thumb.public_id}`} title={name} desc={desc} />
						</Link>
					))}
				</div>
			</div>
		)
	}

	renderAddCourse() {
		const { data } = this.props
		const { listCourses } = data

		return <AddEdit
			title='Manage Courses'
			fields={createFieldsFromMutation(createCourseMutation)}
			items={listCourses}
			onSubmit={(values) => {
				if (values.id) {
					this.props.updateCourse({ variables: values })
				} else {
					this.props.createCourse({ variables: values })
				}
			}}
		/>
	}

	render() {
		const { data } = this.props
		const { listCourses } = data

		return (
			<Layout>
				<Layout.Header>
					<Header />
				</Layout.Header>
				<div className={styles.container}>
					<div className={styles.innerContainer}>
					<Heading>Free Courses</Heading>
					{listCourses && this.renderCourses(listCourses)}
					{this.renderAddCourse()}
					</div>
				</div>
				<Layout.Footer>
					<Footer />
				</Layout.Footer>
			</Layout>
		)
	}
}
