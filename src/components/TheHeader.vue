<template>
  <header>
    <h1 class="logo">Todo List</h1>
    <base-button variation="transparent" v-if="isLoggedIn">Logout</base-button>
    <base-button variation="transparent" @click="openAuth" else
      >Sign in</base-button
    >
  </header>
</template>

<script>
export default {
  inject: ["isLoggedIn", "openAuth"],
};
</script>

<style scoped>
h1 {
  color: white;
  -webkit-text-stroke: 1px var(--color-black);
  -webkit-text-fill-color: var(--color-white);
  font-size: 22px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (min-width: 425px) {
  h1 {
    font-size: 24px;
  }
}

@media (min-width: 768px) {
  h1 {
    font-size: 28px;
  }
}

@media (min-width: 1280px) {
  h1 {
    font-size: 32px;
  }
}
</style>
