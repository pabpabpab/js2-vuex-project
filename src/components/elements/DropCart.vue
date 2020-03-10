<template>
  <div>
    <router-link class="cart_link" to="/cart">
      <img :src="imgPath + 'cart.svg'" alt="cart" class="cart">
      <div class="cart_quantity" v-show="goodsQuantity">{{ goodsQuantity }}</div>
    </router-link>
    <div class="drop_cart">
      <template v-if="cartItemsLength">
        <drop-cart-item
          v-for="item of cartItems"
          :key="item.id_product"
          :cart-item="item"
          @remove="remove">
        </drop-cart-item>

        <div class="drop_cart_totalPrice">
          <p class="drop_cart_totalPrice_left">TOTAL</p>
          <p class="drop_cart_totalPrice_right">${{ totalPrice }}</p>
        </div>

        <router-link class="drop_cart_checkOut" to="/checkout">
          Checkout
        </router-link>
        <router-link class="drop_cart_goToCart" to="/cart">
          Go to cart
        </router-link>
      </template>

      <div class="drop_cart_empty" v-else>
        Корзина пуста
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DropCartItem from '@/components/elements/DropCartItem.vue';

export default {
  name: 'DropCart',
  components: { DropCartItem },
  data() {
    return {
      showCart: false,
    };
  },
  methods: {
    ...mapActions([
      'initCartItems',
      'remove',
    ]),
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'cartItems',
      'cartItemsLength',
      'totalPrice',
      'goodsQuantity',
    ]),
  },
  mounted() {
    this.$store.dispatch('initCart');
  },
};
</script>
