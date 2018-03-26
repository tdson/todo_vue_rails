<template>
  <div>
    <div class="row">
      <div class="col s10 m11">
        <input v-model="newTask.name" class="form-control" placeholder="Task name">
      </div>
      <div class="col s2 m1">
        <div class="btn-floating waves-effect waves-light red" @click="createTask(newTask)">
          <i class="material-icons">add</i>
        </div>
      </div>
    </div>
    <div id="open-tasks">
      <ul class="collection">
        <task v-for="task in unfinishedTasks" :key="task.id" :task="task"
          @task-done="doneTask" @delete-task="deleteTask" @update-task="updateTask"></task>
      </ul>
    </div>
    <div class="btn" @click="showFinishedTasks">Show finished tasks</div>
    <div id="finished-tasks" class="display-none">
      <ul class="collection">
        <task v-for="task in finishedTasks" :key="task.id" :task="task"
          @task-done="doneTask" @delete-task="deleteTask" @update-task="updateTask"></task>
      </ul>
    </div>
  </div>
</template>

<script type="text/javascript">
  import axios from 'axios'
  import Task from './tasks/task'
  import {mapGetters, mapActions, mapState} from 'vuex'

  export default {
    components: {
      Task,
    },
    data: function() {
      return {}
    },
    mounted() {
      this.fetchTasks()
    },
    computed: {
      ...mapState('task', [
        'unfinishedTasks',
        'finishedTasks',
        'newTask'
      ]),
    },
    methods: {
      ...mapActions('task', [
        'fetchTasks',
        'createTask',
        'doneTask',
        'deleteTask',
        'updateTask'
      ]),
      showFinishedTasks () {
        document.querySelector('#finished-tasks').classList.toggle('display-none')
      }
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
