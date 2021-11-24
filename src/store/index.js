import { createStore } from 'vuex';
import { Howl } from 'howler';
import { auth, usersCollection } from '../includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
  },
  getters: {
    authModalShow: (state) => state.authModalShow,
  },
  mutations: {
    toggleAuthModal: (state) => {
      state.authModalShow = !state.authModalShow;
    },
    toggleAuth: (state) => {
      state.userLoggedIn = !state.userLoggedIn;
    },
    newSong(state, payload) {
      state.currentSong = payload;
      state.sound = new Howl({
        src: [payload.url],
        html5: true,
      });
    },
  },
  actions: {
    async register({ commit }, {
      name,
      password,
      email,
      age,
      country,
    }) {
      const userCred = await auth.createUserWithEmailAndPassword(email, password);

      await usersCollection
        .doc(userCred.user.uid)
        .set({
          name,
          email,
          age,
          country,
        });

      await userCred.user.updateProfile({
        displayName: name,
      });

      commit('toggleAuth');
    },
    async login({ commit }, { email, password }) {
      await auth.signInWithEmailAndPassword(email, password);
      commit('toggleAuth');
    },
    initLogin({ commit }) {
      const user = auth.currentUser;

      if (user) {
        commit('toggleAuth');
      }
    },
    async signOut({ commit }) {
      await auth.signOut();
      commit('toggleAuth');
    },
    async newSong({ commit, state }, payload) {
      commit('newSong', payload);

      state.sound.play();
    },
  },
  modules: {
  },
});
