<template>
  <form>
    <input class="input" type="text" placeholder="Username" />
    <input class="input" type="text" placeholder="Password" />
    <base-button variation="green" type="submit" class="submit-button"
      >Sign Up</base-button
    >
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.submit-button {
  padding: 0.75rem;
}
</style>
