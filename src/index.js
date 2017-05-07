require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'

import App from './App.js';
import topics from './stores/topics'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

ReactDOM.render(
	<Provider topics={topics}>
		<Router>
			<Route path='/' component={App} />
		</Router>
	</Provider>,
	document.getElementById('app')
);
