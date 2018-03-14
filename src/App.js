import React, { Component } from 'react';
import './App.css';
import RouterConfig from './router';
import Navigator from './components/Navigator/Navigator';

class App extends Component {
  render() {
    return (
      <Navigator children={<RouterConfig />} />
    );
  }
}

export default App;
