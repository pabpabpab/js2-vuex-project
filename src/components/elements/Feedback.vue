<template>
  <div class="gratitudes" v-if="feedbackListLength > 1">
    <div class="one_gratitude">
      <div class="one_gratitude_left">
        <a href="#" @click.prevent>
          <img :src="imgPath + feedbackList[currentIndex].img"
               alt="person" class="grateful_person_img">
        </a>
      </div>
      <div class="one_gratitude_right">
        <p class="gratitude_text">{{feedbackList[currentIndex].text}}</p>
        <a href="#" class="person_name" @click.prevent>{{feedbackList[currentIndex].name}}</a>
        <p class="person_city">{{feedbackList[currentIndex].city}}</p>
        <div class="gratitudes_switcher">
          <a href="#"
             v-for="(item, index) of feedbackList"
             :key="item.id" :class="feedbackList[index].link_css"
             @click.prevent="getFeedback(index)"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Feedback',
  methods: {
    ...mapActions([
      'getFeedback',
    ]),
    /*
    getFeedback(index) {
      this.$store.dispatch('getFeedback', index);
    },
*/
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'feedbackList',
      'feedbackListLength',
      'currentIndex',
    ]),
  },
  mounted() {
    this.$store.dispatch('initFeedbackList');
  },
};
</script>
