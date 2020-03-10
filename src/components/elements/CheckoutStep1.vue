<template>
  <div class="container">
    <form action="#"
          class="shoppingCart_address_discount_grandTotal"
          @submit.prevent="saveUserData()">

      <div class="shoppingCart_address">
        <h5 class="shoppingCart_h5">Shipping Adress</h5>
        <p class="shippingCountries_input_wrapper">
          <select name="shippingCountry"
                  id="shippingCountry"
                  class="shipping_input shippingCountries_input"
                  v-model="userCountry">
            <option></option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Pakistan">Pakistan</option>
            <option value="India">India</option>
          </select>
        </p>
        <input type="text" placeholder="State" class="shipping_input"
               v-model="userState">
        <input type="text" placeholder="Postcode / Zip" class="shipping_input"
               v-model="userPostCode">
        <input type="submit" value="get a quote" class="shippingSubmit">
      </div>

      <div class="shoppingCart_discount">
        <h5 class="shoppingCart_h5">
          coupon  discount
        </h5>
        <p class="shoppingCart_discount_text">
          Enter your coupon code if you have one
        </p>
        <input type="text" name="stateForDiscount" placeholder="Coupon code" class="shipping_input"
               v-model="userCouponCode">
        <input type="submit" value="Apply coupon" class="shippingSubmit">
      </div>

      <div class="shoppingCart_grandTotal">
        <p class="shoppingCart_grandTotal_subTotal">
          Sub total
          <span class="shoppingCart_grandTotal_subTotal_value">
            ${{ totalPrice }}
          </span></p>
        <p class="shoppingCart_grandTotal_grandTotal">
          GRAND TOTAL
          <span class="shoppingCart_grandTotal_grandTotal_value">
            ${{ totalPrice }}
          </span>
        </p>
        <button type="submit" class="shoppingCart_proceed">
          proceed to checkout
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CheckoutStep1',
  data() {
    return {
      userCountry: '',
      userState: '',
      userPostCode: '',
      userCouponCode: '',
    };
  },
  methods: {
    saveUserData() {
      const userData = {
        user_country: this.userCountry,
        user_state: this.userState,
        user_post_code: this.userPostCode,
        user_coupon_code: this.userCouponCode,
      };

      this.$store.dispatch('uploadUserData', userData);

      this.$router.push({ name: 'CheckoutPage' });
    },
  },
  computed: {
    ...mapGetters([
      'totalPrice',
    ]),
  },
};
</script>
