<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      autofocus
      placeholder="你需要做什么？"
      @keyup.enter="onAdd"
    />
  </header>
</template>

<script setup>
const emit = defineEmits(['add-todo'])

function onAdd(e) {
  const value = e.target.value.trim()
  if (!value) return
  emit('add-todo', value)
  e.target.value = ''
}
</script>

