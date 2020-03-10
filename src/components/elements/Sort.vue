<template>
  <select name="sortBy"
          class="sortBy_input"
          v-model="userSort"
          @change="sort(userSort)">
    <option disabled value=""></option>
    <option>Name</option>
    <option>Price</option>
    <option>Size</option>
  </select>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Sort',
  data() {
    return {
      userSort: '',
    };
  },
  methods: {
    ...mapActions([
      'sort',
    ]),
  },
};
</script>
