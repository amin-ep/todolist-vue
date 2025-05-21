<template>
  <div class="container">
    <TheHeader :isLoggedIn="isLoggedIn" />
    <CreateTodo @addTodo="addTodo" :isLoggedIn="isLoggedIn" />
    <TodoList
      :deleteTodo="deleteTodo"
      :todos="todos"
      :isLoggedIn="isLoggedIn"
    />
    <AuthTabs v-if="authIsOpen" />
  </div>
</template>

<script>
import CreateTodo from "./components/CreateTodo.vue";
import TheHeader from "./components/TheHeader.vue";
import AuthTabs from "./components/Auth/AuthTabs.vue";
import TodoList from "./components/Todos/TodoList.vue";
import { API_BASE_URL, AUTH_TOKEN_KEY } from "./utils/constants";

export default {
  components: {
    TheHeader,
    CreateTodo,
    AuthTabs,
    TodoList,
  },
  data() {
    return {
      isLoggedIn: false,
      authIsOpen: false,
      todos: [],
      isLoading: false,
    };
  },
  provide() {
    return {
      authIsOpen: this.authIsOpen,
      openAuth: this.openAuth,
      closeAuth: this.closeAuth,
      login: this.login,
      logout: this.logout,
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
      this.closeAuth();
    },
    logout() {
      this.$cookies.remove(AUTH_TOKEN_KEY);
      this.isLoggedIn = false;
    },
    checkIsLoggedIn() {
      const token = this.$cookies.get(AUTH_TOKEN_KEY);
      if (token) {
        this.isLoggedIn = true;
      }
    },
    loadTodos() {
      this.isLoading = true;
      this.error = null;
      const token = this.$cookies.get(AUTH_TOKEN_KEY);
      if (token) {
        fetch(`${API_BASE_URL}/todo/myTodo`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (res.ok) return res.json();
          })
          .then((data) => {
            this.todos = data.data;
            this.isLoading = false;
          })
          .catch(() => {
            this.isLoading = false;
            this.error = "Failed to get data! please try again later";
          });
      }
    },
    addTodo(title) {
      const token = this.$cookies.get(AUTH_TOKEN_KEY);

      fetch(`${API_BASE_URL}/todo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          console.log(data.data);
          this.todos.push(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteTodo(id) {
      console.log("deleting");

      const token = this.$cookies.get(AUTH_TOKEN_KEY);
      fetch(`${API_BASE_URL}/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      }).then(() => {
        this.todos = this.todos.filter((todo) => todo._id != id);
      });
    },
  },
  mounted() {
    this.checkIsLoggedIn();
    console.log("mounted");
  },
  created() {
    console.log("created");
  },
  updated() {
    console.log("updated");
  },

  watch: {
    isLoggedIn(status) {
      if (status) {
        this.loadTodos();
      }
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
