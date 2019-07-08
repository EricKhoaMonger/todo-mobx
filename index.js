import React, { useRef } from 'react';
import { render } from 'react-dom';
import { Provider, observer, inject } from 'mobx-react'
import Todos from './Todos';
import todoStore from './store'
import './style.css';

const App = inject('todoStore')(observer(({ todoStore }) => {
  const inputRef = useRef('')

  const submitHandler = e => {
    e.preventDefault()
    const { value } = inputRef.current
    if (!value || !value.trim()) return

    todoStore.addTodo({ title: value, completed: false, userId: todoStore.list.length + 1 })
    inputRef.current.value = ''
  }

  return (
    <div>
      <h2>MobX Todos</h2>
      <form onSubmit={submitHandler}>
        <input ref={inputRef} />
        <button onClick={submitHandler}> + </button>
      </form>
      <hr />
      <Todos />
    </div>
  );
}))

render(<Provider todoStore={todoStore}><App /></Provider>, document.getElementById('root'));
