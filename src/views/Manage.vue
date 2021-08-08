<template>
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <app-upload ref="upload" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <app-composition-item
              v-for="song in songs"
              :key="song.docID"
              :song="song"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import AppUpload from '../components/Upload.vue';
import AppCompositionItem from '../components/CompositionItem.vue';
import { songsCollection, auth } from '../includes/firebase';

export default {
  name: 'manage',
  components: {
    AppUpload,
    AppCompositionItem,
  },
  data() {
    return {
      songs: [],
    };
  },
  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();
    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      this.songs.push(song);
    });
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) {
  //     next();
  //   }
  //   next({ name: 'home' });
  // },
};
</script>

<style scoped>

</style>
