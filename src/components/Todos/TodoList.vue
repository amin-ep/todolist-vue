<template>
  <ul>
    <TodoItem
      v-for="todo in todos"
      :completed="todo.completed"
      :key="todo.id"
      :title="todo.title"
      :id="todo.id"
    />
  </ul>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  components: { TodoItem },
  inject: ["todos"],
};
</script>

<style scoped>
ul {
  margin: 1rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
