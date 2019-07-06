import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react'
import Todos from './Todos';
import todoStore from './store'
import './style.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <h2>
          MobX Todos
        </h2>
        <hr />
        <Todos />
      </div>
    );
  }
}

render(<Provider todoStore={todoStore}><App /></Provider>, document.getElementById('root'));
