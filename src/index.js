import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layout';
import Header from './Header';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import {  Route, BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Header />
    <Route exact path="/" component={Home} />
    <Route exact path="/workspace" component={Layout} />
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
