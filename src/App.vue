<template>
  <div class="container">
    <TheHeader :isLoggedIn="isLoggedIn" />
    <CreateTodo
      @addTodo="addTodo"
      :isLoggedIn="isLoggedIn"
      :isCreatingTodo="isCreatingTodo"
    />
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
import { toast } from "vue3-toastify";

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
          })
          .catch(() => {
            this.error = "Failed to get data! please try again later";
          })
          .finally(() => {
            this.isLoading = false;
          });
      }
    },
    addTodo(title) {
      const creatingToast = toast.loading("Adding Todo...", {
        closeButton: false,
        closeOnClick: false,
      });
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
          return res.json();
        })
        .then((data) => {
          if (data.status == "success") {
            this.todos.push(data.data);
            toast.update(creatingToast, {
              type: "success",
              render: "Added successfully",
              autoClose: 1000,
              closeOnClick: true,
              closeButton: true,
              isLoading: false,
            });
          } else {
            toast.update(creatingToast, {
              autoClose: 4000,
              closeOnClick: true,
              closeButton: true,
              type: "error",
              render: data.message || "Something went wrong!",
              isLoading: false,
            });
          }
        })
        .catch(() => {
          toast.update(creatingToast, {
            autoClose: 4000,
            closeOnClick: true,
            closeButton: true,
            render: "Something went wrong!",
            type: "error",
            isLoading: false,
          });
        });
    },
    deleteTodo(id) {
      const deletingToast = toast.loading("Removing...", {
        closeButton: false,
        closeOnClick: false,
      });
      const token = this.$cookies.get(AUTH_TOKEN_KEY);
      fetch(`${API_BASE_URL}/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "DELETE",
      })
        .then((res) => {
          console.log(res);
          if (res.status === 204) {
            this.todos = this.todos.filter((todo) => todo._id != id);
            toast.update(deletingToast, {
              autoClose: 800,
              closeOnClick: true,
              closeButton: true,
              type: "success",
              render: "Deleted successfully",
              isLoading: false,
            });
          } else {
            toast.update(deletingToast, {
              autoClose: 4000,
              closeOnClick: true,
              closeButton: true,
              type: "error",
              render: data.message || "Something went wrong!",
              isLoading: false,
            });
          }
        })
        .catch(() => {
          toast.update(creatingToast, {
            autoClose: 4000,
            closeOnClick: true,
            closeButton: true,
            render: "Something went wrong!",
            type: "error",
            isLoading: false,
          });
        });
    },
  },
  mounted() {
    this.checkIsLoggedIn();
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
