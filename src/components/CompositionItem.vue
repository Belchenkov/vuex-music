<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">{{ song.modifiedName }}</h4>
      <button class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right">
        <i class="fa fa-times"></i>
      </button>
      <button
        @click.prevent="showForm = !showForm"
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <vee-form
          @submit="edit"
          :validation-schema="schema"
          :initial-values="song"
      >
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
                 name="modifiedName"
                 type="text"
                 class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                 placeholder="Enter Song Title"
          />
          <ErrorMessage class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
                name="genre"
                type="text"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300
                        transition duration-500 focus:outline-none focus:border-black rounded"
                 placeholder="Enter Genre"
          />
          <ErrorMessage class="text-red-600" name="genre" />
        </div>
        <div class="flex justify-between">
          <button type="submit" class="py-1.5 px-3 mr-3 rounded text-white bg-green-600">
            Submit
          </button>
          <button type="button" class="py-1.5 px-3 rounded text-white bg-gray-600">
            Go Back
          </button>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompositionItem',
  props: {
    song: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: 'required',
        genre: 'alpha_spaces',
      },
    };
  },
  methods: {
    edit() {
      console.log('edit');
    },
  },
};
</script>

<style scoped>

</style>
