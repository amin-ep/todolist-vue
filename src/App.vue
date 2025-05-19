<template>
  <div class="container">
    <TheHeader />
    <CreateTodo />
    <TodoList />
    <AuthTabs v-if="authIsOpen" />
  </div>
</template>

<script>
import CreateTodo from "./components/CreateTodo.vue";
import TheHeader from "./components/TheHeader.vue";
import AuthTabs from "./components/Auth/AuthTabs.vue";
import TodoList from "./components/Todos/TodoList.vue";

export default {
  components: {
    TheHeader,
    CreateTodo,
    AuthTabs,
    TodoList,
  },
  data() {
    return {
      todos: [
        { id: "1", completed: true, title: "Create todo app" },
        { id: "2", completed: false, title: "Work on next.js" },
      ],
      isLoggedIn: false,
      userData: {},
      authIsOpen: false,
    };
  },
  provide() {
    return {
      authIsOpen: this.authIsOpen,
      isLoggedIn: this.isLoggedIn,
      openAuth: this.openAuth,
      closeAuth: this.closeAuth,
      login: this.login,
      logout: this.logout,
      todos: this.todos,
      deleteTodo: this.deleteTodo,
      addTodo: this.addTodo,
    };
  },
  methods: {
    openAuth() {
      this.authIsOpen = true;
    },
    closeAuth() {
      this.authIsOpen = false;
    },
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
    addTodo(title) {
      const newTodo = {
        id: String(this.todos.length + 1),
        title: title,
        completed: false,
      };
      this.todos.unshift(newTodo);
    },
    deleteTodo(id) {
      const todoIndex = this.todos.findIndex((el) => el.id === id);
      this.todos.splice(todoIndex, 1);
    },
  },
};
</script>

<style scoped>
.container {
  width: 40rem;
  margin-inline: auto;
  max-width: 100%;
  padding: 0 0.5rem;
}
</style>
