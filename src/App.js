import React, { Component } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import Topics from './components/Topics'
import Topic from './components/Topic'
import Footer from './components/Footer'
import ChatBubble from './components/ChatBubble'
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
				</div>
				<Footer />
				<ChatBubble />
			</div>
		)
	}
}
