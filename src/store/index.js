import { createStore } from 'vuex';
import { auth, userrCollection } from '../includes/firebase';

export default createStore({
  state: {
    authModalShow: false,
    userLoggedIn: false,
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

      await userrCollection
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
  },
  modules: {
  },
});
