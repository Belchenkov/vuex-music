<template>
  <div>
    <app-header />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <app-player />

    <auth-modal />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue';
import AuthModal from './components/Auth.vue';
import AppPlayer from './components/Player.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AuthModal,
    AppPlayer,
  },
  created() {
    this.$store.dispatch('initLogin');
  },
};
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap');
  #app {
    font-family: 'Titillium Web', sans-serif;
  }
  .fade-enter-from {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all .3s linear;
  }
  .fade-leave-to {
    transition: all .3s linear;
    opacity: 0;
  }
</style>
