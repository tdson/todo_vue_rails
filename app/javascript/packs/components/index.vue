<template>
  <div>
    <div class="row">
      <div class="col s10 m11">
        <input v-model="newTask" class="form-control" placeholder="Task name">
      </div>
      <div class="col s2 m1">
        <div class="btn-floating waves-effect waves-light red" @click="createTask">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>
    <div id="open-tasks">
      <ul class="collection">
        <task v-if="!task.is_done" v-for="task in tasks" :key="task.id" :task="task" @task-done="doneTask"></task>
      </ul>
    </div>
    <div class="btn" @click="showFinishedTasks">Show finished tasks</div>
    <div id="finished-tasks" class="display-none">
      <ul class="collection">
        <task v-if="task.is_done" v-for="task in tasks" :key="task.id" :task="task" @task-done="doneTask"></task>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import Task from './tasks/task'

  export default {
    components: {
      Task,
    },
    data: function () {
      return {
        tasks: [],
        newTask: '',
      }
    },
    mounted() {
      this.fetchTasks()
    },
    methods: {
      fetchTasks: function() {
        axios.get('/api/tasks.json')
          .then((response) => {
            this.tasks = response.data.tasks;
          }, (error) => {
            console.log(error);
          });
      },
      showFinishedTasks: function() {
        document.querySelector('#finished-tasks').classList.toggle('display-none');
      },
      createTask: function() {
        if (!this.newTask) {
          return
        } else {
          axios.post('/api/tasks.json', {task: {name: this.newTask}})
            .then((response) => {
              this.tasks.unshift(response.data.task);
              this.newTask = ""
            }, (error) => {
              console.log(error)
            })
        }
      },
      doneTask: function(task, isDone) {
        let id = task.id
        axios.put(`/api/tasks/${id}.json`, {task: {is_done: isDone}})
          .then((response) => {
            this.reorderLists(id, isDone)
          }, (error) => {
            console.log(error)
          })
      },
      reorderLists: function(taskID, isDone) {
        let row = document.querySelector(`#row-task-${taskID}`)
        let clonedRow = row.cloneNode(true)
        row.parentNode.removeChild(row)
        let listID = isDone ? "finished-tasks" : "open-tasks"
        let finishedList = document.querySelector(`#${listID} > ul > li:first-child`)
        document.querySelector(`#${listID} > ul`).insertBefore(clonedRow, finishedList)
      },
    },
  }
</script>

<style scoped>
  [v-cloak] {
    display: none;
  }

  .display-none {
    display: none;
  }
</style>
