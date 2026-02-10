<template>
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      :checked="allDone"
      @change="$emit('toggle-all', ($event.target).checked)"
    />
    <label for="toggle-all">标记所有为已完成</label>
    <ul class="todo-list">
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle-todo="$emit('toggle-todo', $event)"
        @remove-todo="$emit('remove-todo', $event)"
        @edit-todo="$emit('edit-todo', $event)"
      />
    </ul>
  </section>
</template>

<script setup>
import TodoItem from './TodoItem.vue'

defineProps({
  todos: {
    type: Array,
    required: true
  },
  allDone: {
    type: Boolean,
    required: true
  }
})

defineEmits(['toggle-todo', 'remove-todo', 'edit-todo', 'toggle-all'])
</script>

