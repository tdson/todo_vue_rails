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
      // We no need taskList getter so far, Because we use mapState for 'taks'
      // and get tasks list via this state.
      ...mapGetters(['taskList']),
      ...mapState(['tasks', 'newTask']),
    },
    methods: {
      ...mapActions([
        'fetchTasks',
        'showFinishedTasks',
        'createTask',
        'doneTask',
      ]),
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
