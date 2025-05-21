<template>
  <div v-if="!isLoggedIn">
    <h3>To access you have to login first</h3>
  </div>
  <div v-else>
    <h3 v-if="isLoading">Loading...</h3>
    <h3 v-else-if="!isLoading && todos.length === 0 && !error">
      You have nothing todo :)
    </h3>
    <ul v-else-if="!isLoading && todos.length > 0 && !error">
      <TodoItem
        v-for="todo in todos"
        :completed="todo.completed"
        :key="todo._id"
        :title="todo.title"
        :id="todo._id"
        @deleteTodo="deleteTodo"
      />
    </ul>
    <p v-else-if="!isLoading && error">{{ error }}</p>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
export default {
  components: { TodoItem },
  props: ["isLoggedIn", "todos", "isLoading", "deleteTodo"],
};
</script>

<style scoped>
h3 {
  text-align: center;
}
ul {
  margin: 1rem 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
