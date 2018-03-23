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
    <div>
      <ul class="collection">
        <li v-for="task in tasks" v-if="!task.is_done" :id="`row-task-${task.id}`" class="collection-item">
          <input type="checkbox" :id="`task-${task.id}`" @change="doneTask(task.id)">
          <label :for="`task-${task.id}`">{{task.name}}</label>
        </li>
      </ul>
    </div>
    <div class="btn" @click="showFinishedTasks">Show finished tasks</div>
    <div id="finished-tasks" class="display-none">
      <ul class="collection">
        <li v-for="task in tasks" v-if="task.is_done" :id="`row-task-${task.id}`" class="collection-item">
          <input type="checkbox" :id="`task-${task.id}`" :checked="task.is_done">
          <label :for="`task-${task.id}`">{{task.name}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'

  export default {
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
      doneTask: function(id) {
        axios.put(`/api/tasks/${id}.json`, {task: {is_done: true}})
          .then((response) => {
            this.moveFinishedTask(id)
          }, (error) => {
            console.log(error)
          })
      },
      moveFinishedTask: function(taskID) {
        console.log(`Task#${taskID} has been moved to finished.`);
        let row = document.querySelector(`#row-task-${taskID}`)
        let clonedRow = row.cloneNode(true)
        row.parentNode.removeChild(row)
        let finishedList = document.querySelector("#finished-tasks > ul > li:first-child")
        document.querySelector("#finished-tasks > ul").insertBefore(clonedRow, finishedList)
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
