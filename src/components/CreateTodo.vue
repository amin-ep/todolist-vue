<script setup>
import { PlusIcon } from "@heroicons/vue/16/solid";
</script>

<template>
  <form @submit.prevent="createTodo">
    <header>
      <h2>Your To Do</h2>
    </header>
    <div class="form-control">
      <input
        class="input"
        v-model="enteredTitle"
        type="text"
        placeholder="Todo..."
      />
      <base-button variation="dark" class="submit-btn">
        <PlusIcon class="plus-icon" />
      </base-button>
    </div>
    <error-message v-show="errors.title">* {{ errors.title }}</error-message>
  </form>
</template>

<script>
export default {
  data() {
    return {
      enteredTitle: "",
      errors: {
        title: null,
      },
    };
  },
  inject: ["openAuth"],
  props: ["isLoggedIn"],
  methods: {
    createTodo() {
      if (!this.isLoggedIn) {
        this.openAuth();
        return;
      } else {
        const title = this.enteredTitle;
        if (title.length < 1) {
          this.errors.title = "Title is required";
          return;
        } else if (title.length > 30) {
          this.errors.title = "Title must be 30 or less chars";
          return;
        }
        this.errors = {
          title: null,
        };
        this.$emit("addTodo", this.enteredTitle);
        this.enteredTitle = "";
      }
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

header {
  text-align: center;
  font-size: 18px;
}

.form-control {
  display: flex;
  position: relative;
}
.plus-icon {
  width: 12px;
  aspect-ratio: 1 / 1;
  color: var(--color-white);
}

.submit-btn {
  aspect-ratio: 1 / 1;
  position: absolute;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  width: 34px;
}

@media (min-width: 425px) {
  header {
    text-align: center;
    font-size: 22px;
  }
  .submit-btn {
    height: 42px;
  }

  .plus-icon {
    width: 14px;
  }
}

@media (min-width: 768px) {
  header {
    text-align: center;
    font-size: 28px;
  }
  .submit-btn {
    height: 44px;
    height: 44px;
  }

  .plus-icon {
    width: 14px;
  }
}
</style>
