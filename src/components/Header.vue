<template>
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >Music</router-link>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li>
            <router-link
              :to="{ name: 'about' }"
              class="px-2 text-white"
            >About</router-link>
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
              <router-link class="px-2 text-white" :to="{ name: 'manage' }">Manage</router-link>
            </li>
            <li>
              <a class="px-2 text-white" href="#" @click.prevent="signOut">Logout</a>
            </li>
          </template>
        </ul>
        <ul class="flex flex-row mt-1 ml-auto">
          <li>
            <a
              href="#"
              class="px-2 text-white"
              @click.prevent="changeLocale"
            >
              {{ currentLocale }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import {
  mapMutations,
  mapState,
} from 'vuex';

export default {
  name: 'Header',
  methods: {
    ...mapMutations(['toggleAuthModal']),
    signOut() {
      this.$store.dispatch('signOut');
      if (
        this.$route.meta.requiresAuth === 'manage'
        || this.$route.name === 'account'
        || this.$route.name === 'billing'
        || this.$route.name === 'taxes'
        || this.$route.name === 'edit'
      ) {
        this.$router.push({ name: 'home' });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === 'fr' ? 'en' : 'fr';
    },
  },
  computed: {
    ...mapState([
      'userLoggedIn',
    ]),
    currentLocale() {
      return this.$i18n.locale === 'fr' ? 'French' : 'English';
    },
  },
};
</script>

<style scoped>

</style>
