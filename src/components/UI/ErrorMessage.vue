<template>
  <p>
    <slot></slot>
  </p>
</template>

<style scoped>
p {
  color: red;
  font-size: 12px;
  font-weight: 600;
}

@media (min-width: 768px) {
  p {
    font-size: 14px;
  }
}
</style>
