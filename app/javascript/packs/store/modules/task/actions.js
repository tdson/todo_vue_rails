import axios from 'axios'
import * as mutations from './mutation-types'

export const fetchTasks = (context) => {
  axios.get('/api/tasks.json')
    .then(
      response => context.commit(mutations.TASK_FETCHED, response.data.tasks),
      error => console.log(error)
    )
}

export const createTask = (context, task) => {
  if (task.name) {
    axios.post('api/tasks.json', {task: task})
      .then(
        response => context.commit(mutations.TASK_CREATED, response.data.task),
        error => console.log(error)
      )
  }
}

export const doneTask = (context, payload) => {
  axios.put(`/api/tasks/${payload.task.id}.json`, {task: {is_done: payload.status}})
    .then(
      response => {
        payload.task = response.data.task
        return context.commit(mutations.TASK_DONE, payload)
      },
      error => console.log(error)
    )
}

export const deleteTask = (context, task) => {
  axios.delete(`/api/tasks/${task.id}.json`)
    .then(
      response => context.commit(mutations.TASK_DELETED, task),
      error => console.log(error)
    )
}

export const updateTask = (context, task) => {
  let name = prompt('Enter new name', task.name).trim()
  if (!name) {
    Materialize.toast("Name can't be blank!", 3000)
    return null
  }
  axios.put(`/api/tasks/${task.id}.json`, {task: {name: name}})
    .then(
      response => context.commit(mutations.TASK_UPDATED, response.data.task),
      error => console.log(error)
    )
}

export default {
  fetchTasks,
  createTask,
  doneTask,
  deleteTask,
  updateTask
}
