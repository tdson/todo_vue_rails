import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex/dist/vuex.esm'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    tasks: [],
    newTask: {
      name: '',
      is_done: false
    }
  },
  actions: {
    fetchTasks (context) {
      axios.get('/api/tasks.json')
        .then(response => context.commit('tasksFetched', response.data.tasks))
    },
    showFinishedTasks () {
      document.querySelector('#finished-tasks').classList.toggle('display-none')
    },
    createTask (context, task) {
      if (!task.name) {
        return null
      } else {
        axios.post('api/tasks.json', {task: task})
          .then(response => {
            context.state.tasks.unshift(response.data.task)
            context.state.newTask.name = ''
          }, error => {
            console.log(error)
          })
      }
    },
    doneTask (context, payload) {
      let id = payload.task.id
      let data = {task: {is_done: payload.status}}
      axios.put(`/api/tasks/${id}.json`, data)
        .then(response => {
          context.dispatch('reorderLists', payload)
        }, error => {
          console.log(error)
        })
    },
    reorderLists (context, payload) {
      let taskID = payload.task.id
      let isDone = payload.status
      let row = document.querySelector(`#row-task-${taskID}`)
      let clonedRow = row.cloneNode(true)
      row.parentNode.removeChild(row)
      let listID = isDone ? 'finished-tasks' : 'open-tasks'
      let finishedList = document.querySelector(`#${listID} > ul > li:first-child`)
      document.querySelector(`#${listID} > ul`).insertBefore(clonedRow, finishedList)
    }
  },
  mutations: {
    tasksFetched (state, tasks) {
      state.tasks = tasks
    }
  },
  getters: {
    // We no need taskList getter so far, Because we use mapState for 'taks'
    // and get tasks list via this state.
    taskList: state => {
      return state.tasks
    }
  }
})
