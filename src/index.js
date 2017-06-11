require('es6-promise').polyfill();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo'

import App from './App.js';
import courses from './stores/courses'
import topics from './stores/topics'
import user from './stores/user'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8888/api/graphql',
    credentials: 'same-origin'
  }),
  shouldBatch: true,
	addTypename: false
})

ReactDOM.render(
  <ApolloProvider client={client}>
  	<Provider
  		courses={courses}
  		topics={topics}
  		user={user}
  	>
  		<Router>
  			<Route path='/' component={App} />
  		</Router>
  	</Provider>
  </ApolloProvider>,
	document.getElementById('app')
);
