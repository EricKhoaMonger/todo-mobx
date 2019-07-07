import { observable, computed, action, runInAction, reaction } from 'mobx'
import { persist, hydrate, create } from 'mobx-persist'
import makeInspectable from 'mobx-devtools-mst';

const URL = 'https://jsonplaceholder.typicode.com/todos'

class TodoStore {
  @persist('list') @observable list = []
  @observable loading = true

  @computed get completedTodos() {
    return this.list.filter(todo => todo.completed)
  }

  @action('fetchTodo')
  async fetchTodos() {
    try {
      const response = await fetch(URL)
      const data = await response.json()
      runInAction(() => {
        this.list = data
        this.list.length = 20
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
  async toggleTodo(todo) {
    const todoIdx = this.list.indexOf(todo)
    try {
      let res = await fetch(URL + '/' + todo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(todo)
      })
      res = await res.json()
      runInAction(() => {
        this.list[todoIdx].completed = !this.list[todoIdx].completed
      })
    } catch (ex) {
      console.log(ex)
    }
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
reaction(
  () => todoStore.completedTodos.length,
  length => {
    if (length === todoStore.list.length) console.log(`you've completed all todos`)
    else if (length > 10) console.log(`nicely done! you've completed ${length} todos`)
  }
)

export default todoStore;

hydrate('todoStore', todoStore)
  .then(() => todoStore.checkStore())

makeInspectable(todoStore);