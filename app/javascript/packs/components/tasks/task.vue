<template>
  <li :id="`row-task-${task.id}`" class="collection-item">
    <input type="checkbox" :id="`task-${task.id}`" @change="fireDoneTask(task, $event)" :checked="task.is_done">
    <label :for="`task-${task.id}`">{{task.name}}</label>
  </li>
</template>

<script type="text/javascript">
  export default {
    props: ['task'],
    data() {
      return {}
    },
    methods: {
      fireDoneTask: function(task, e) {
        this.$emit('task-done', {task: task, status: e.target.checked})
      },
    },
  }
</script>
