import React, { useEffect, useState } from 'react';
import { observer, inject } from 'mobx-react'
import Todo from './Todo'

const gridSystem = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: 20
}

const Todos = ({ todoStore }) => {
  const toggle = (todo) => todoStore.toggleTodo(todo)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    try {
      todoStore.fetchTodos()
      console.log(todoStore.list)
      setLoading(false)
    } catch (ex) {
    }
    setLoading(false)
  })

  return loading ?
    <p>Loading ...</p> :
    todoStore.list.length === 0 ?
      <p>Please add some</p> : (
        <div style={gridSystem}>
          {todoStore.list.map(todo => <Todo toggle={toggle} todo={todo} key={todo.id} />)}
        </div>
      )
}

export default inject('todoStore')(observer(Todos))
