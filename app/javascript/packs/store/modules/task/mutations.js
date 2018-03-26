import * as mutations from './mutation-types'

export default {
  [mutations.TASK_FETCHED] (state, tasks) {
    state.finishedTasks = tasks.filter(task => task.is_done === true)
    state.unfinishedTasks = tasks.filter(task => task.is_done !== true)
  },
  [mutations.TASK_CREATED] (state, task) {
    state.newTask.name = ''
    state.unfinishedTasks.unshift(task)
  },
  [mutations.TASK_DONE] (state, payload) {
    let isDone = payload.status === true
    if (isDone) {
      state.finishedTasks.unshift(payload.task)
      let taskIndex = state.unfinishedTasks.findIndex(task => task.id === payload.task.id)
      state.unfinishedTasks.splice(taskIndex, 1)
    } else {
      state.unfinishedTasks.unshift(payload.task)
      let taskIndex = state.finishedTasks.findIndex(task => task.id === payload.task.id)
      state.finishedTasks.splice(taskIndex, 1)
    }
  }
}
