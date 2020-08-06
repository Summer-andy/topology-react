import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './Layout';
import Header from './Header';
import Home from './Home';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter } from 'react-router-dom';
import { reducer, initState } from './Reducer';
export const Context = React.createContext(null);

const App = () => {

  const [exampleState, exampleDispatch] = useReducer(reducer, initState);

  return <Context.Provider value={{ state: exampleState, dispatch: exampleDispatch }}>
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/workspace" component={Layout} />
    </BrowserRouter >
  </Context.Provider>
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
