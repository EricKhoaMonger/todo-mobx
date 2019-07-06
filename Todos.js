import React, { useEffect } from 'react';
import { observer, inject } from 'mobx-react'
import Todo from './Todo'

const gridSystem = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gridGap: 20
}

const Todos = ({ todoStore }) => {
  useEffect(() => {
    todoStore.checkStore()
  }, [])

  const toggle = (todo) => todoStore.toggleTodo(todo)

  return todoStore.loading ? <p>Loading ...</p> : (
    <div style={gridSystem}>
      {todoStore.list.map(todo => <Todo toggle={toggle} todo={todo} />)}
    </div>
  )
}

export default inject('todoStore')(observer(Todos))
