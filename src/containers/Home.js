import React, { Component } from 'react'
import styles from './Home.css'
import { Link } from 'react-router-dom'
import { gql, graphql } from 'react-apollo'

import Layout from 'components/Layout'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Heading, Paragraph } from 'components/core'
import Card from 'components/Card'

const listCoursesQuery = gql`
	query RootQuery {
		courses: listCourses {
			id
			name
			desc
			uri
			thumb {
				public_id
			}
		}
	}`

@graphql(listCoursesQuery)
export default class Home extends Component {
	componentDidMount() {
		const script = document.createElement('script')
		script.id = 'typef_orm_share'
		script.src = 'https://s3-eu-west-1.amazonaws.com/share.typeform.com/share.js'
		setTimeout(() => {
			document.getElementsByTagName('head')[0].appendChild(script)
		}, 5)
	}

	render() {
		const { courses } = this.props.data

		return (
			<Layout>
        <Layout.Header>
          <Header />
        </Layout.Header>
        <div className={styles.container}>
          <div className={styles.innerContainer}>
            <Heading>Pakistan.js</Heading>
						<Paragraph>We are a small but growing community of software developers/engineers from Pakistan.</Paragraph>
						<Paragraph>We are here to train/educate begineers, discuss ideas and help actively improve ourselves.</Paragraph>

						<div className={styles.block}>
							<Heading>Free Courses</Heading>
							<div className={styles.courseList}>
								{courses && courses.map(({ name, desc, thumb }) => <Card imgSrc={`http://res.cloudinary.com/pakistanjs-com/image/upload/w_250,h_200,c_fit/${thumb.public_id}`} title={name} desc={desc} />)}
							</div>
            </div>
						<div className={styles.block}>
							<Heading>Join the community</Heading>

							<a
								className={styles.joinSlack}
								href="https://pakistanjs.slack.com/shared_invite/MTkyNTE5ODYwNDUzLTE0OTY1ODcxODItYTI4NGZjMGIwMQ"
								target="blank"
							>
								Join us @
								<img src={require('./join_slack.png')} alt="Pakistan.JS @ Slack"/>
							</a>
							<a
								className={styles.joinFB}
								href="https://www.facebook.com/groups/233808260152392/"
								target="blank"
							>
								<img src={require('./join_fb.png')} alt="Pakistan.JS @ Facebook"/>
							</a>
            </div>
          </div>
        </div>
        <Layout.Footer>
          <Footer />
        </Layout.Footer>
			</Layout>
		)
	}
}
