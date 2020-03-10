<template>
  <div class="error-block" @click.self="setHttpError(null)" v-if="isVisible">
    <p class="error-msg">
      <button class="close-btn" @click="setHttpError(null)">&times;</button>
      {{ httpError }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Error',
  methods: {
    ...mapMutations([
      'setHttpError',
    ]),
  },
  computed: {
    ...mapGetters([
      'httpError',
    ]),
    isVisible() {
      return this.httpError != null;
    },
  },
};
</script>
