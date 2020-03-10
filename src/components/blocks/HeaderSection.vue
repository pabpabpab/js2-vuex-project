<template>
  <header class="header">
    <div class="container header_content">
      <div class="header__left">
        <router-link to="/">
          <img :src="imgPath + 'logo.png'" alt="logo" class="logo_img">
        </router-link>
        <router-link class="logo_text" to="/">
          BRAN
        </router-link>

        <search ref="search"></search>

      </div>
      <div class="header__right">
        <div class="header__right__cart">

          <drop-cart></drop-cart>

        </div>
        <div class="header__right__myaccount">
          <a href="#" class="link_button my_account_arrow">My Account</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import Search from '@/components/elements/Search.vue';
import DropCart from '@/components/elements/DropCart.vue';

export default {
  name: 'HeaderSection',
  components: { Search, DropCart },
  computed: {
    ...mapGetters([
      'imgPath',
    ]),
  },
};
</script>
