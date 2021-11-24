import { createStore } from 'vuex';
import { Howl } from 'howler';
import { auth, usersCollection } from '../includes/firebase';
import helper from '../includes/helper';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
    currentSong: {},
    sound: {},
    seek: '00:00',
    duration: '00:00',
  },
  getters: {
    authModalShow: (state) => state.authModalShow,
    playing: (state) => {
      if (state.sound.playing) {
        return state.sound.playing();
      }
      return false;
    },
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
    updatePosition(state) {
      state.seek = helper.formatTime(state.sound.seek());
      state.duration = helper.formatTime(state.sound.duration());
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
    async newSong({ commit, state, dispatch }, payload) {
      commit('newSong', payload);

      state.sound.play();
      state.sound.on('play', () => {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      });
    },
    async toggleAudio({ state }) {
      if (!state.sound.playing) {
        return;
      }

      if (state.sound.playing()) {
        state.sound.pause();
      } else {
        state.sound.play();
      }
    },
    progress({ commit, state, dispatch }) {
      commit('updatePosition');

      if (state.sound.playing()) {
        requestAnimationFrame(() => {
          dispatch('progress');
        });
      }
    },
  },
  modules: {
  },
});
