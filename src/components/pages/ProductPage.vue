<template>
  <DIV>
    <bread-crumbs></bread-crumbs>

    <single-product></single-product>

    <section class="also">
      <h4 class="also_h4">you may like also</h4>
      <products ref="products" mode="you-may-like-also"></products>
    </section>
  </DIV>
</template>

<script>
import BreadCrumbs from '@/components/elements/BreadCrumbs.vue';
import SingleProduct from '@/components/elements/SingleProduct.vue';
import Products from '@/components/elements/Products.vue';

export default {
  name: 'ProductPage',
  components: { BreadCrumbs, SingleProduct, Products },
};
</script>
