require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'

import App from './App.js';
import courses from './stores/courses'
import topics from './stores/topics'
import user from './stores/user'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

ReactDOM.render(
	<Provider
		courses={courses}
		topics={topics}
		user={user}
	>
		<Router>
			<Route path='/' component={App} />
		</Router>
	</Provider>,
	document.getElementById('app')
);
