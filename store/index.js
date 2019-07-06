import { observable, computed, action, runInAction } from 'mobx'
import { persist, hydrate, create } from 'mobx-persist'
import makeInspectable from 'mobx-devtools-mst';


class TodoStore {
  @persist('list') @observable list = []
  @observable loading = true

  @computed get completedTodos() {
    return this.list.filter(todo => todo.completed)
  }

  @action('fetchTodo')
  async fetchTodos() {
    this.loading = true
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      runInAction(() => {
        this.list = data
        this.loading = false
      })
    } catch (ex) {
      runInAction(() => {
        this.list = []
        this.loading = false
      })
    }
  }

  @action('toggleTodo')
  toggleTodo(todo) {
    const todoIdx = this.list.indexOf(todo)
    this.list[todoIdx].completed = !this.list[todoIdx].completed
  }

  @action('checkStore')
  checkStore() {
    this.loading = true
    const hydratedStore = localStorage.getItem('todoStore')
    if (!hydratedStore || JSON.parse(hydratedStore).list.length === 0) {
      this.fetchTodos()
    } else {
      this.list = JSON.parse(hydratedStore).list
      this.loading = false
    }
  }
}

const hydrate = create({
  storage: localStorage
})

const todoStore = new TodoStore()

export default todoStore;

hydrate('todoStore', todoStore)
  .then(() => todoStore.checkStore())

makeInspectable(todoStore);