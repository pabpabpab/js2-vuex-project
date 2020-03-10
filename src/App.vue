<template>
  <div id="app">
    <header-section></header-section>
    <top-navigation></top-navigation>
    <router-view></router-view>
    <feedback-section></feedback-section>
    <bottom-section></bottom-section>
    <footer-section></footer-section>
    <message></message>
    <error></error>
  </div>
</template>

<script>
import HeaderSection from '@/components/blocks/HeaderSection.vue';
import TopNavigation from '@/components/blocks/TopNavigation.vue';
import FeedbackSection from '@/components/blocks/FeedbackSection.vue';
import BottomSection from '@/components/blocks/BottomSection.vue';
import FooterSection from '@/components/blocks/FooterSection.vue';
import Message from '@/components/blocks/Message.vue';
import Error from '@/components/blocks/Error.vue';

export default {

  components: {
    HeaderSection,
    TopNavigation,
    FeedbackSection,
    BottomSection,
    FooterSection,
    Message,
    Error,
  },
  // при переходе по страницам отматывать страницу к верху
  watch: {
    $route(to, from) {
      if (from.name) {
        window.scrollBy(0, -1000000);
      }
    },
  },
};
</script>
