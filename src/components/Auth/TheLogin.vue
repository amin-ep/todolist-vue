<template>
  <form @submit.prevent="submitForm">
    <input
      v-model="enteredUsername"
      class="input"
      type="text"
      placeholder="Username"
    />
    <error-message v-show="errors.username">{{
      errors.username
    }}</error-message>

    <input
      v-model="enteredPassword"
      class="input"
      type="text"
      placeholder="Password"
    />
    <error-message v-show="errors.password">{{
      errors.password
    }}</error-message>

    <base-button
      :disabled="isPending"
      variation="green"
      type="submit"
      class="submit-button"
    >
      <base-spinner v-if="isPending"></base-spinner>
      <span v-else>Login</span>
    </base-button>
  </form>
</template>

<script>
import { API_BASE_URL, AUTH_TOKEN_KEY } from "../../utils/constants";

export default {
  data() {
    return {
      isPending: false,
      enteredUsername: "",
      enteredPassword: "",
      errors: {
        username: null,
        password: null,
      },
    };
  },
  inject: ["login"],
  watch() {},
  computed: {},
  methods: {
    async submitForm() {
      const username = this.enteredUsername;
      const password = this.enteredPassword;
      const payload = {
        username,
        password,
      };

      // validate username
      if (username.trim().length < 4) {
        this.errors.username = "Username should be at least 4 characters";
        return;
      } else if (username.trim().length > 16) {
        this.errors.username =
          "Username should be equal or greater than 16 characters";
        return;
      } else {
        this.errors.username = null;
      }
      // validate password
      if (password.trim().length < 8) {
        this.errors.password = "Password should be at least 8 characters";
        return;
      } else if (password.trim().length > 14) {
        this.errors.password =
          "Password should be equal or greater than 14 characters";
        return;
      } else {
        this.errors.password = null;
      }

      this.isPending = true;
      fetch(`${API_BASE_URL}/auth/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => {
          // HERE
          // setCookie(AUTH_TOKEN_KEY, data.token, 7);
          this.$cookies.set(AUTH_TOKEN_KEY, data.token, "10d");
          this.login();
        })
        .finally(() => {
          this.isPending = false;
        });
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.submit-button {
  padding: 0.5rem;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
