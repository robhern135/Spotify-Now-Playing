import React, { Component } from 'react';
import './App.css';

import Home from './components/Home';
import Artist from './components/Artist';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/artist" component={Artist} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
