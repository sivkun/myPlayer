import React from 'react'
import {Route,IndexRoute} from 'react-router'
import App from './Main'
import audioPlay from './AudioPlay'

module.exports=(
  <Route path="/" component={App}>
    <IndexRoute  components={{audioPlay:audioPlay}}/>
  </Route>
)
