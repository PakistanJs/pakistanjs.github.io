import React, { Component } from 'react'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Topics from './components/Topics'
import Topic from './components/Topic'
import Footer from './components/Footer'
import ChatBubble from './components/ChatBubble'
import Experts from './components/Experts'

import ManageCourses from './containers/ManageCourses'
import ManageSections from './containers/ManageSections'

import styles from './App.css'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

export default class App extends Component {
	render() {
		const { children } = this.props

		return (
			<div className={styles.app}>
				<Header />
				<div className={styles.content}>
					<Route exact={true} path='/' component={Home} />
					<Route path='/topics' component={Topics} />
					<Route path='/topic/:id' component={Topic} />
					<Route path='/experts' component={Experts} />
					<Route path='/courses' component={ManageCourses} />
					<Route path='/sections' component={ManageSections} />
				</div>
				<Footer />
				<ChatBubble />
				<DevTools />
			</div>
		)
	}
}
