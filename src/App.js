import React, { Component } from 'react'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'

import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Topics from './components/Topics'
import Topic from './components/Topic'
import Footer from './components/Footer'
import ChatBubble from './components/ChatBubble'
import Experts from './components/Experts'
import Layout from 'components/Layout'

import Home from 'containers/Home'
import Courses from 'containers/Courses'
import Course from 'containers/Course'
import Section from 'containers/Section'

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
				<Route exact={true} path='/' component={Home} />
				<Route path='/topics' component={Topics} />
				<Route path='/topic/:id' component={Topic} />
				<Route path='/experts' component={Experts} />
				<Route path='/courses' component={Courses} />
				<Route exact={true} path='/course/:courseURI' component={Course} />
				<Route path='/course/:courseURI/:sectionURI' component={Section} />
				<ChatBubble />
			</div>
		)
	}
}
