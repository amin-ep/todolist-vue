<template>
  <teleport to="body">
    <div class="overlay" @click="$emit('close')"></div>
    <dialog open>
      <slot name="header"></slot>
      <div>
        <slot></slot>
      </div>
    </dialog>
  </teleport>
</template>

<script>
export default {};
</script>

<style scoped>
dialog {
  background: var(--color-white);

  position: absolute;
  z-index: 10;
  margin-inline: auto;

  max-width: 100%;
  width: 30rem;

  border-radius: 18px;
  border: 1px solid var(--color-stone-300);
  top: 25%;

  box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.08);
}

.overlay {
  background: transparent;
  position: absolute;
  backdrop-filter: blur(8px);
  z-index: 9;
  inset: 0;
}
</style>
