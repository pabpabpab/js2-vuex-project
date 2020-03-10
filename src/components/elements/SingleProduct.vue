<template>
  <main>
    <div class="singleProduct">
      <div class="container singleProduct_img_container">
        <a href="#" class="product_img_link"
           @click.prevent="nextPhoto()" v-html="productImg">
        </a>
      </div>
      <a href="#" class="left_flyer" @click.prevent="prevPhoto()">
        <i class="fas fa-angle-left"></i>
      </a>
      <a href="#" class="right_flyer" @click.prevent="nextPhoto()">
        <i class="fas fa-angle-right"></i>
      </a>
    </div>

    <div class="container singleProduct_info">
      <p class="collection_name">WOMEN COLLECTION</p>
      <div class="flatFlyer">
        <a href="#" class="flatFlyer_link"></a>
        <a href="#" class="flatFlyer_link flatFlyer_link_active"></a>
        <a href="#" class="flatFlyer_link"></a>
      </div>
      <h2 class="singleProduct_name_h2">{{singleProduct.product_name}}</h2>
      <div class="singleProduct_description_wrapper">
        <p class="singleProduct_description">
          Compellingly actualize fully researched processes before
          proactive outsourcing. Progressively syndicate
          collaborative architectures before cutting-edge services.
          Completely visualize parallel core competencies
          rather than exceptional portals.
        </p>
      </div>
      <div class="material_and_designer">
        <div class="material">MATERIAL:
          <p class="material_value">{{singleProduct.material}}</p>
        </div>
        <div class="designer">DESIGNER:
          <p class="designer_value">{{singleProduct.designer}}</p>
        </div>
      </div>

      <p class="singleProduct_price">${{singleProduct.price}}</p>

      <div class="parametersBox_wrapper">
        <div class="parametersBox">
          <div class="parametersBox_one">
            <p class="parameterName">CHOOSE COLOR</p>
            <p class="color_input_wrapper">
              <select class="color_input" v-model="inputColor">
                <option>Red</option>
                <option>Blue</option>
                <option>Black</option>
              </select>
            </p>
          </div>
          <div class="parametersBox_one">
            <p class="parameterName">CHOOSE SIZE</p>
            <p class="color_input_wrapper">
              <select class="color_input" v-model="inputSize">
                <option value="XXS,1">XXS</option>
                <option value="XS,2">XS</option>
                <option value="S,3">S</option>
                <option value="M,4">M</option>
                <option value="L,5">L</option>
                <option value="XL,6">XL</option>
                <option value="XXL,7">XXL</option>
              </select>
            </p>
          </div>
          <div class="parametersBox_one parametersBox_one_last">
            <p class="parameterName">QUANTITY</p>
            <input type="number" min="1" max="999" step="1"
                   required class="quantity_input" v-model="inputQuantity">
          </div>
        </div>
      </div>

      <div class="singleProduct__Cart__link__wrapper">
        <a href="cart.html" class="singleProduct__Cart__link"
           @click.prevent="addProduct()">
          <img :src="imgPath + 'red_cart.svg'" alt="cart" class="red_cart_img"> Add to Cart
        </a>
      </div>

    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SingleProduct',
  data() {
    return {
      inputColor: '',
      inputSize: '',
      inputQuantity: 0,
    };
  },
  methods: {
    ...mapActions([
      'nextPhoto',
      'prevPhoto',
      'addSingleProduct',
    ]),
    addProduct() {
      const userInputs = {
        inputColor: this.inputColor,
        inputSize: this.inputSize,
        inputQuantity: this.inputQuantity,
      };
      this.$store.dispatch('addSingleProduct', userInputs);
    },
  },
  computed: {
    ...mapGetters([
      'imgPath',
      'singleProduct',
      'productImg',
    ]),
  },
  watch: {
    // когда находишься на странице одного товара,
    // и внизу на странице в блоке "you may like also" нажимаешь на другой товар,
    // то перезагрузки компонента (загрузки нового товара) не происходит,
    // отслеживание такого маршрута помогло
    $route(to, from) {
      if ((to.name === 'ProductPage') && (from.name === 'ProductPage')) {
        this.$store.dispatch('initSingleProduct', this.$route.params.id);
      }
    },
  },
  mounted() {
    // загрузить один товар с сервера по его id
    this.$store.dispatch('initSingleProduct', this.$route.params.id);
  },
};
</script>
