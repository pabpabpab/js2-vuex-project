<template>
  <DIV>
    <bread-crumbs></bread-crumbs>
    <main class="container shoppingCart">

      <div class="shoppingCart__header">
        <div class="shoppingCart__item__productDetails shoppingCartTile">Product Details</div>
        <div class="shoppingCart__item__unitPrice shoppingCartTile">unite Price</div>
        <div class="shoppingCart__item__quantity shoppingCartTile">Quantity</div>
        <div class="shoppingCart__item__shipping shoppingCartTile">shipping</div>
        <div class="shoppingCart__item__subtotal shoppingCartTile">Subtotal</div>
        <div class="shoppingCart__item__action shoppingCartTile">ACTION</div>
      </div>

      <cart-page-body></cart-page-body>
      <checkout-step-1></checkout-step-1>
    </main>
  </DIV>
</template>

<script>
import BreadCrumbs from '@/components/elements/BreadCrumbs.vue';
import CartPageBody from '@/components/elements/CartPageBody.vue';
import CheckoutStep1 from '../elements/CheckoutStep1.vue';

export default {
  name: 'CartPage',
  components: { BreadCrumbs, CartPageBody, CheckoutStep1 },
};
</script>
