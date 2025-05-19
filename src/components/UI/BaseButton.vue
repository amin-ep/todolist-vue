<template>
  <button :class="variation">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    variation: {
      type: String,
      required: false,
      enum: ["transparent", "dark", "green"],
      default: "transparent",
    },
  },
};
</script>

<style scoped>
button {
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  border-radius: 12px;

  position: relative;
}

.transparent {
  background: transparent;
  border: 1px solid var(--color-stone-300);
  color: var(--color-stone-800);
}

button.transparent:hover {
  box-shadow: 0 12px 26px 0 rgba(2, 201, 82, 0.26);
  color: var(--color-white);
  background: var(--color-green-500);
  border: 1px solid var(--color-green-500);
}

.green {
  background: var(--color-green-500);
  color: var(--color-white);
  border: 1px solid var(--color-green-500);
}

button.green:hover {
  background: var(--color-green-600);
  border: 1px solid var(--color-green-600);
  box-shadow: 0 12px 26px 0 rgba(2, 201, 82, 0.411);
}

.dark {
  background: var(--color-stone-700);
  border: 1px solid var(--color-stone-700);
  color: var(--color-white);
}

.dark:hover {
  background: var(--color-stone-800);
  border: 1px solid var(--color-stone-800);
  box-shadow: 0 12px 26px 0 rgba(0, 0, 0, 0.35);
}
</style>
