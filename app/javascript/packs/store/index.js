import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex/dist/vuex.esm'
import task from './modules/task'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    task
  },
  actions: {
    showFinishedTasks () {
      document.querySelector('#finished-tasks').classList.toggle('display-none')
    }
  }
})
