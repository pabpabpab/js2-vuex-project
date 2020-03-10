<template>
  <div class="message-wrapper" v-if="isVisible" @click="setMessage('')">
    <div class="message-block" v-html="message"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Message',
  methods: {
    ...mapMutations([
      'setMessage',
    ]),
  },
  computed: {
    ...mapGetters([
      'message',
    ]),
    isVisible() {
      return this.message !== '';
    },
  },
};
</script>
