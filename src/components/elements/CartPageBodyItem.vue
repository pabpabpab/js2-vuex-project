<template>
  <div class="shoppingCart__item">
    <div class="shoppingCart__item__productDetails">
      <router-link class="shoppingCart__productImg__link" :to="'/product/' + cartItem.id_product">
        <img :src="imgPath + cartItem.img[0]" alt="product_1" class="shoppingCart__productImg">
      </router-link>
      <div class="shoppingCart__productParametersBox">
        <router-link class="shoppingCart__productName" :to="'/product/' + cartItem.id_product">
          {{cartItem.product_name}}
        </router-link>
        <p class="shoppingCart__productColor">
          Color: <span class="shoppingCart__productColor__value">{{cartItem.color}}</span>
        </p>
        <p class="shoppingCart__productSize">
          Size: <span class="shoppingCart__productSize__value">{{cartItem.size}}</span>
        </p>
      </div>
    </div>
    <div class="shoppingCart__item__unitPrice">${{cartItem.price}}</div>
    <div class="shoppingCart__item__quantity">
      <input type="number"
             v-model="cartItem.quantity"
             min="1" max="999"
             @input="inputProductQuantity({ item: cartItem, quantity: cartItem.quantity })"
             required class="shoppingCart__item__quantity_input">
    </div>
    <div class="shoppingCart__item__shipping">
      FREE
    </div>
    <div class="shoppingCart__item__subtotal">
      ${{calcSubtotalPrice(cartItem)}}
    </div>
    <div class="shoppingCart__item__action">
      <a href="#" @click.prevent="remove(cartItem)" class="drop_cart_closer top0"></a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CartPageBodyItem',
  props: ['cartItem'],
  methods: {
    ...mapActions([
      'inputProductQuantity',
      'remove',
    ]),
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'calcSubtotalPrice',
    ]),
  },
};
</script>
