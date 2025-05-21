<template>
  <li>
    <div>
      <input type="checkbox" :defaultChecked="completed" />
      <p :class="completed && 'completed'">{{ title }}</p>
    </div>
    <div>
      <button @click="removeTodo" class="remove-btn">x</button>
    </div>
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
  emits: ["deleteTodo"],
  methods: {
    removeTodo() {
      this.$emit("deleteTodo", this.id);
    },
  },
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

.remove-btn {
  all: unset;
  cursor: pointer;
  background: var(--color-stone-600);
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1/1;
  width: 16px;
  height: 16px;
  vertical-align: middle;

  border-radius: 2.5px;
}

.remove-btn:hover {
  background: var(--color-stone-700);
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
