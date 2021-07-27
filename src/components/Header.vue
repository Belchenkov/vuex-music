<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        to="/"
      >Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link to="/about" class="px-2 text-white" href="/about">About</router-link>
          </li>
          <li v-if="!userLoggedIn">
            <router-link
              class="px-2 text-white"
              to="/login"
              @click.prevent="toggleAuthModal"
            >Login / Register</router-link>
          </li>
          <template v-else>
            <li>
              <router-link class="px-2 text-white" to="/manage">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import {
  mapMutations,
  mapState,
  mapActions,
} from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    ...mapActions(['signOut']),
  },
  computed: {
    ...mapState([
      'userLoggedIn',
    ]),
  },
};
</script>

<style scoped>

</style>
