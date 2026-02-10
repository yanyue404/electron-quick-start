<template>
  <footer class="footer">
    <span class="todo-count">
      <strong>{{ remaining }}</strong> {{ remaining === 1 ? '项' : '项' }}未完成
    </span>
    <ul class="filters">
      <li>
        <a
          href="#"
          :class="{ selected: filter === 'all' }"
          @click.prevent="$emit('change-filter', 'all')"
        >
          全部
        </a>
      </li>
      <li>
        <a
          href="#"
          :class="{ selected: filter === 'active' }"
          @click.prevent="$emit('change-filter', 'active')"
        >
          待办
        </a>
      </li>
      <li>
        <a
          href="#"
          :class="{ selected: filter === 'completed' }"
          @click.prevent="$emit('change-filter', 'completed')"
        >
          已完成
        </a>
      </li>
    </ul>
    <button
      v-show="hasCompleted"
      class="clear-completed"
      @click="$emit('clear-completed')"
    >
      清除已完成
    </button>
  </footer>
</template>

<script setup>
defineProps({
  remaining: {
    type: Number,
    required: true
  },
  filter: {
    type: String,
    required: true
  },
  hasCompleted: {
    type: Boolean,
    required: true
  }
})

defineEmits(['change-filter', 'clear-completed'])
</script>

