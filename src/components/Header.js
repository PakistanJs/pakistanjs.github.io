import React, { Component } from 'react'
import styles from './Header.css'
import GithubIcon from './Icons/GithubIcon'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import { Dropdown } from 'semantic-ui-react'

class Header extends Component {
	renderAdminDropdown() {
		const { currentUser } = this.props.user
		if (currentUser) {
			return (
				<Dropdown text={`Hello, ${currentUser.name}`}>
					<Dropdown.Menu>
						<Dropdown.Item>
							<Link to='/courses'>Manage Courses</Link>
						</Dropdown.Item>
						<Dropdown.Item>
							<Link to='/sections'>Manage Sections</Link>
						</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item text='Logout'>
							<a href="/api/logout">Logout</a>
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
			)
		}
	}

	render() {
		return (
			<div className={styles.header}>
				<div className={styles.headerInner}>
					<div className={styles.headerSection}>
						<Link to='/'>
							<img className={styles.logo} src={require('./logo.jpg')} alt="Pakistan.JS"/>
						</Link>
						<div className={styles.slogan}>
							<h3>PAKISTAN.JS</h3>
							<p>Share &amp; Learn Web/Mobile/IoT Development</p>
						</div>
					</div>
					<div className={styles.headerSection}>
						{this.props.user.currentUser ?
							this.renderAdminDropdown() :
							<a
								className={styles.loginButton}
								href='http://localhost:8888/api/login'
							>
								<GithubIcon /> Sign in with GitHub
							</a>
						}
					</div>
				</div>
			</div>
		)
	}
}

export default inject('user')(observer(Header))
