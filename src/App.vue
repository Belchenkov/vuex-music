<template>
  <div>
    <app-header />

    <router-view></router-view>

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
</style>
