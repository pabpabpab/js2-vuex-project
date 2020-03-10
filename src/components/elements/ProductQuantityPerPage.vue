<template>
  <p class="sortBy_input_wrapper">
    <!-- eslint-disable max-len -->
    <select name="sortBy"
            class="sortBy_input"
            v-model="userProductQuantityPerPage"
            @change="divideProductsIntoPages(userProductQuantityPerPage)">
      <option v-for="n in 15" :value="n" :key="n">{{ getOptionText(n) }}</option>
    </select>
  </p>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductQuantityPerPage',
  data() {
    return {
      userProductQuantityPerPage: 9,
    };
  },
  methods: {
    ...mapActions([
      'divideProductsIntoPages',
    ]),
    getOptionText(n) {
      return (n < 10) ? `0${n}` : n;
    },
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'productQuantityPerPage',
    ]),
  },
  watch: {
    // обратная связь (от стора в v-model)
    // здесь имя функции совпадает с именем вычисляемого свойства,
    // и при его изменении выполняет действия (заметка себе),
    // здесь это нужно когда по кнопке "View all" из другого компонента,
    // через геттер stor'a сбросить значение select-инпута
    productQuantityPerPage() {
      this.userProductQuantityPerPage = this.productQuantityPerPage;
    },
    /*
    // могут быть такие параметры (новое и старое значение вычисляемого св-ва)
    // их туда помещает сам watch
    productQuantityPerPage(newVal, oldVal) {
      this.userProductQuantityPerPage = this.productQuantityPerPage;
      console.log(newVal);
      console.log(oldVal);
    },
    // также имя функции может совпадать со свойством из ф-ии data,
    // для отслеживания изменения свойства из data
*/
  },
  mounted() {
    // обратная связь (от стора в v-model) при включении
    this.userProductQuantityPerPage = this.productQuantityPerPage;
  },
};
</script>
