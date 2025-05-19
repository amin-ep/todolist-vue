<template>
  <li>
    <div>
      <input type="checkbox" />
      <p :class="completed && 'completed'">{{ title }}</p>
    </div>
    <button @click="deleteTodo(id)">x</button>
  </li>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
  },
  inject: ["deleteTodo"],
};
</script>

<style scoped>
li {
  background: white;
  border-radius: 12px;
  outline: none;
  border: 1px solid var(--color-stone-300);
  padding: 0.5rem 0.75rem;
  font-size: 14px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

li div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

p {
  margin: 0;
}

.completed {
  text-decoration: line-through;
  color: var(--color-stone-400);
  font-style: italic;
}
@media (min-width: 425px) {
  li {
    padding: 0.75rem;
  }

  li div {
    gap: 0.75rem;
  }
}

@media (min-width: 768px) {
  li {
    font-size: 16px;
  }
}
</style>
