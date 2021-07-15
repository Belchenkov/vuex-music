import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjWLFPsJsyTvW0imdxas7XdiVwTiNx1Xs',
  authDomain: 'vuex-music-45087.firebaseapp.com',
  projectId: 'vuex-music-45087',
  storageBucket: 'vuex-music-45087.appspot.com',
  appId: '1:542928086752:web:ebe14ae9a87d895f769285',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const userrCollection = db.collection('users');

export {
  auth,
  db,
  userrCollection,
};
