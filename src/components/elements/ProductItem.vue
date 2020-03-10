<template>
  <div :class="oneProductClass">
    <router-link class="featured__one__imgLink" :to="'/product/' + product.id_product">
      <img :src="imgPath + product.img[0]" alt="product" class="featured__one__img">
    </router-link>
    <div class="featured__one__textdiv">
      <router-link class="featured__one__nameLink" :to="'/product/' + product.id_product">
        {{product.product_name}}
      </router-link>
      <p class="featured__one__price">${{product.price}}</p>
    </div>
    <a href="#" class="featured__one__whiteCart__link" @click.prevent="addProduct(product)">
      <img :src="imgPath + 'white_cart.svg'" alt="cart" class="white_cart_img">
      Add to Cart
    </a>
    <div class="good_quantity_control" v-if="getProductQuantity(product) > 0">
      <div class="good_quantity_control__btn_left" @click="addProduct(product)">+</div>
      <div class="good_quantity_control__value">{{getProductQuantity(product)}}</div>
      <div class="good_quantity_control__btn_right" @click="remove(product)">-</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductItem',
  props: ['product', 'mode'],

  data() {
    return {
      oneProductClass: '',
    };
  },
  methods: {
    ...mapActions([
      'addProduct',
      'remove',
    ]),
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'getProductQuantity',
    ]),
  },
  mounted() {
    switch (this.mode) {
      case 'featured-products':
        this.oneProductClass = 'featured__one';
        break;
      case 'you-may-like-also':
        this.oneProductClass = 'featured__one also__one';
        break;
      default:
        this.oneProductClass = 'featured__one';
    }
  },
};
</script>
