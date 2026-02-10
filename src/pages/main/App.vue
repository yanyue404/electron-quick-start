<template>
  <div class="app-container">
    <section class="todoapp">
      <TodoHeader @add-todo="addTodo" />
      <TodoList
        v-show="todos.length"
        :todos="filteredTodos"
        :all-done="allDone"
        @toggle-todo="toggleTodo"
        @remove-todo="removeTodo"
        @edit-todo="editTodo"
        @toggle-all="toggleAll"
      />
      <TodoFooter
        v-show="todos.length"
        :remaining="remaining"
        :filter="filter"
        :has-completed="todos.length > remaining"
        @change-filter="changeFilter"
        @clear-completed="clearCompleted"
      />
    </section>
    <footer class="info">
      <p>双击编辑待办事项</p>
      <p>
        基于
        <a href="https://todomvc.com" target="_blank">TodoMVC</a>
      </p>
      <p>
        <a href="#" class="about-link" @click.prevent="openAbout">关于此应用</a>
      </p>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import TodoHeader from './components/TodoHeader.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'

// Persistence
const STORAGE_KEY = 'todos-electron-vue3'

function fetchTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

// State
const todos = ref(fetchTodos())
const filter = ref('all')

// Auto-save
watchEffect(() => {
  saveTodos(todos.value)
})

// Computed
const remaining = computed(() => {
  return todos.value.filter((todo) => !todo.completed).length
})

const allDone = computed(() => {
  return remaining.value === 0
})

const filteredTodos = computed(() => {
  const filters = {
    all: todos.value,
    active: todos.value.filter((todo) => !todo.completed),
    completed: todos.value.filter((todo) => todo.completed)
  }
  return filters[filter.value]
})

// Methods
function addTodo(title) {
  todos.value.push({
    id: Date.now(),
    title,
    completed: false
  })
}

function toggleTodo(todo) {
  todo.completed = !todo.completed
}

function removeTodo(todo) {
  const index = todos.value.indexOf(todo)
  if (index > -1) {
    todos.value.splice(index, 1)
  }
}

function editTodo({ todo, title }) {
  todo.title = title
}

function toggleAll(value) {
  todos.value.forEach((todo) => {
    todo.completed = value
  })
}

function changeFilter(newFilter) {
  filter.value = newFilter
}

function clearCompleted() {
  todos.value = todos.value.filter((todo) => !todo.completed)
}

function openAbout() {
  if (window.electronAPI) {
    window.electronAPI.openAbout()
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}
.about-link {
  cursor: pointer;
  color: inherit;
  text-decoration: underline;
}
</style>

