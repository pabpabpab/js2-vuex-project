<template>
  <div>
    <template v-if="goodsQuantity">
      <cart-page-body-item
        v-for="item of cartItems"
        :key="item.id_product"
        :cart-item="item">
      </cart-page-body-item>

      <div class="container shoppingCart_clear_and_continue">
        <a href="#" @click.prevent="clearCart()" class="shoppingCart_clear">
          cLEAR SHOPPING CART
        </a>
        <router-link class="shoppingCart_continue" to="/catalog">
          cONTINUE sHOPPING
        </router-link>
      </div>
    </template>
    <div class="shoppingCart_is_empty" v-else>
      the cart is empty
    </div>
  </div>
</template>

<script>
import CartPageBodyItem from '@/components/elements/CartPageBodyItem.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartPageBody',
  components: { CartPageBodyItem },
  methods: {
    ...mapActions([
      'clearCart',
    ]),
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'cartItems',
      'goodsQuantity',
    ]),
  },
};
</script>
