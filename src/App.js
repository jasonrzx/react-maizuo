import React, { Component } from 'react';
import './App.css';
import './components/iconfont/iconfont.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/js/Header';
import Home from './components/js/Home';
import Detail from './components/js/Detail';
import List from './components/js/List';
import Cinema from './components/js/Cinema';

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/Detail/:fid" component={Detail} />
          <Route path="/List/:tid" component={List} />
          <Route path="/Cinema" component={Cinema} />
      </div>
      </Router>
    );
  }
}

export default App;
