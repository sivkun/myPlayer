import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router,hashHistory} from 'react-router'
import routes from './components/routes'
// Render the main component into the dom
ReactDOM.render(<Router routes={routes} history={hashHistory}/>, document.getElementById('app'));
