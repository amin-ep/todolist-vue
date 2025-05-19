<template>
  <the-dialog @close="closeAuth">
    <template #header>
      <button class="close-button" @click="closeAuth">x</button>
      <header>
        <h2>{{ headingValue }}</h2>
      </header>
    </template>
    <template #default>
      <div class="container">
        <div class="tab-buttons">
          <base-button
            @click="setSelectedTab('the-login')"
            :variation="selectedTab == 'the-login' ? 'green' : 'transparent'"
            >Login</base-button
          >
          <base-button
            @click="setSelectedTab('the-signup')"
            :variation="selectedTab == 'the-signup' ? 'green' : 'transparent'"
            >Signup</base-button
          >
        </div>
        <keep-alive>
          <component :is="selectedTab"></component>
        </keep-alive>
      </div>
    </template>
  </the-dialog>
</template>

<script>
import TheSignup from "./TheSignup.vue";
import TheLogin from "./TheLogin.vue";

export default {
  components: { TheLogin, TheSignup },
  data() {
    return {
      selectedTab: "the-login",
    };
  },
  methods: {
    setSelectedTab(tab) {
      this.selectedTab = tab;
    },
  },
  computed: {
    headingValue() {
      return this.selectedTab === "the-login" ? "Login" : "Signup";
    },
  },
  inject: ["closeAuth"],
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
header {
  text-align: center;
  font-size: 16px;
  color: var(--color-stone-800);
}

.close-button {
  all: unset;
  position: absolute;
  right: 1rem;
  top: 0.5rem;
  cursor: pointer;
  font-size: 30px;
}
.tab-buttons {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}

.tab-buttons button {
  flex: 1;
}

@media (min-width: 425px) {
  header {
    font-size: 20px;
  }
}

@media (min-width: 768px) {
  header {
    font-size: 24px;
  }
}
</style>
