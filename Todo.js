import React from 'react';
import { observer } from 'mobx-react'

const todoCard = {
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  padding: 5,
}

const Todo = ({ todo, toggle }) => {

  const { id, title, completed } = todo

  return (
    <div
      key={id}
      style={todoCard}
    >
      <input
        type="checkbox"
        checked={completed}
        value={completed}
        onChange={() => toggle(todo)} />
      <br />
      <span>{title}</span>
    </div>
  )


}

export default observer(Todo)
