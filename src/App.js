import React, { Component } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import VideoList from './components/VideoList'
import Footer from './components/Footer'
import styles from './App.css'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

export default class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sideNavItems: []
		}

	}

	componentDidMount() {
		fetch('http://api.pakistanjs.com/playlists')
			.then(res => res.json())
			.then(playlists => {
				const sideNavItems = playlists
					.map(({ title, id }) => ({ uri: `/topic/${id}`, name: title}))

				this.setState({
					sideNavItems: sideNavItems
				})
			})
	}

	render() {
		const { sideNavItems } = this.state

		return (
			<div className={styles.app}>
				<Header />
				<Router>
					<div className={styles.content}>
						<Sidebar items={sideNavItems} />
						<Route path="/topic/:id" component={VideoList}/>
					</div>
				</Router>
				<Footer />
			</div>
		)
	}
}
