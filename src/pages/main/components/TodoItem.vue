<template>
  <li
    class="todo"
    :class="{ completed: todo.completed, editing: editing }"
  >
    <div class="view">
      <input
        class="toggle"
        type="checkbox"
        :checked="todo.completed"
        @change="$emit('toggle-todo', todo)"
      />
      <label @dblclick="startEdit">{{ todo.title }}</label>
      <button class="destroy" @click="$emit('remove-todo', todo)"></button>
    </div>
    <input
      v-if="editing"
      ref="editInput"
      class="edit"
      type="text"
      v-model="editTitle"
      @keyup.enter="doneEdit"
      @keyup.escape="cancelEdit"
      @blur="doneEdit"
    />
  </li>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  todo: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-todo', 'remove-todo', 'edit-todo'])

const editing = ref(false)
const editTitle = ref('')
const editInput = ref(null)

function startEdit() {
  editing.value = true
  editTitle.value = props.todo.title
  nextTick(() => {
    editInput.value?.focus()
  })
}

function doneEdit() {
  if (!editing.value) return
  editing.value = false
  const title = editTitle.value.trim()
  if (title) {
    emit('edit-todo', { todo: props.todo, title })
  } else {
    emit('remove-todo', props.todo)
  }
}

function cancelEdit() {
  editing.value = false
}
</script>

