<template>
  <div :class="containerClass">
    <product-item
      v-for="item of customized[currentPage]"
      :key="item.id_product" :product="item" :mode="mode">
    </product-item>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductItem from '@/components/elements/ProductItem.vue';

export default {
  name: 'Products',
  components: { ProductItem },
  props: ['mode'],
  data() {
    return {
      containerClass: 'container featured__content',
    };
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'currentPage',
      'customized',
    ]),
  },
  mounted() {
    switch (this.mode) {
      case 'featured-products':
        this.containerClass = 'container featured__content';
        break;
      case 'you-may-like-also':
        this.containerClass = 'container also_content';
        break;
      default:
        this.containerClass = 'featured__content mt10 min-width-100';
    }
    this.$store.dispatch('initProducts', this.mode);
  },

};
</script>
