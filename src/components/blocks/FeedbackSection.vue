<template>
  <div class="gratitudes_and_subscribe">
    <div class="container gratitudes_and_subscribe_content">
      <!--feedbackComp-->
      <feedback></feedback>
      <!--/feedbackComp-->
      <div class="subscribe">
        <div class="subscribe_content">
          <p class="subscribe_head">Subscribe</p>
          <p class="subscribe_text">FOR OUR NEWLETTER AND PROMOTION</p>
          <form action="#" class="subscribe_form">
            <input type="email" placeholder="Enter your e-mail" class="subscribe_email">
            <button type="submit" class="subscribe_button">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Feedback from '@/components/elements/Feedback.vue';

export default {
  name: 'FeedbackSection',
  components: { Feedback },
};
</script>
