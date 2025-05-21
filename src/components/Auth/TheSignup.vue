<template>
  <form @submit.prevent="signup">
    <input class="input" type="text" placeholder="Name" v-model="enteredName" />
    <error-message v-show="errors.name">{{ errors.name }}</error-message>
    <input
      class="input"
      type="text"
      placeholder="Username"
      v-model="enteredUsername"
    />
    <error-message v-show="errors.username">{{
      errors.username
    }}</error-message>

    <input
      class="input"
      type="text"
      placeholder="Password"
      v-model="enteredPassword"
    />
    <error-message v-show="errors.password">{{
      errors.password
    }}</error-message>

    <base-button variation="green" type="submit" class="submit-button">
      <base-spinner v-if="isPending"></base-spinner>
      <span v-else>Sign Up</span></base-button
    >
  </form>
</template>

<script>
import { API_BASE_URL } from "../../utils/constants";
export default {
  data() {
    return {
      enteredName: "",
      enteredUsername: "",
      enteredPassword: "",
      errors: {
        name: null,
        username: null,
        password: null,
      },
      isPending: false,
    };
  },
  inject: ["closeAuth", "login"],
  methods: {
    async signup() {
      const name = this.enteredName;
      const username = this.enteredUsername;
      const password = this.enteredPassword;

      // validate name
      if (name.trim().length < 2) {
        this.errors.name = "Name should be at least 2 characters";
        return;
      } else if (name.trim().length > 16) {
        this.errors.name = "Name should be equal or greater than 16 characters";
        return;
      } else {
        this.errors.name = null;
      }

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

      fetch(`${API_BASE_URL}/auth/signup`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          password,
        }),
        method: "POST",
      })
        .then((res) => {
          if (res.ok) {
            this.login();
            this.closeAuth();
            return res.json();
          }
        })
        .then((data) => {
          console.log(data);
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
  padding: 0.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
