<template>
  <div class="drop_cart_product">
    <router-link :to="'/product/' + cartItem.id_product">
      <img :src="imgPath + cartItem.img[0]" alt="product" class="drop_cart_product_img">
    </router-link>
    <div class="drop_cart_product_info">
      <router-link class="drop_cart_product_name" :to="'/product/' + cartItem.id_product">
        {{cartItem.product_name}}
      </router-link>
      <p class="drop_cart_stars"></p>
      <div class="drop_cart_quantity_price">
        <p class="drop_cart_quantity">{{cartItem.quantity}}</p>
        <p class="drop_cart_price">${{cartItem.price}}</p>
      </div>
    </div>
    <a href="#" class="drop_cart_closer" @click.prevent="$emit('remove', cartItem)"></a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'DropCartItem',
  props: ['cartItem'],
  computed: {
    ...mapGetters([
      'imgPath',
    ]),
  },
};
</script>
