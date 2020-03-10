<template>
  <nav class="catalog_bottom_nav" v-if="customizedLength > 1">
    <div class="left_pagination">
      <a href="#" class="pagination_link"
         @click.prevent="showPage(currentPage - 1)">
        <i class="fas fa-angle-left"></i>
      </a>

      <a href="#" class="pagination_link pdl0 pdr0"
         @click.prevent="showPage(0)"
         v-if="showFirstPageWithDots">
        1 . . .
      </a>

      <a href="#"
         :class="paginationLinkCssArr[item - 1]"
         @click.prevent="showPage(item - 1)"
         v-for="item of paginationLinksShot" :key="item">
        {{ item }}
      </a>

      <!-- eslint-disable max-len -->
      <a href="#" class="pagination_link pdl0 pdr0"
         @click.prevent="showPage(customizedLength - 1)"
         v-if="showLastPageWithDots">
        . . . {{customizedLength}}
      </a>

      <a href="#" class="pagination_link"
         @click.prevent="showPage(currentPage + 1)">
        <i class="fas fa-angle-right"></i>
      </a>
    </div>
    <div class="right_viewAll">
      <a href="#" class="viewAll_link"
         @click.prevent="divideProductsIntoPages(1000000);">
        View All
      </a>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Pagination',
  methods: {
    ...mapActions([
      'showPage',
      'divideProductsIntoPages',
    ]),
  },
  computed: {
    ...mapGetters([
      'currentPage',
      'customized',
      'customizedLength',
      'paginationLinksShot',
      'paginationLinkCssArr',
      'wing',
    ]),
    showFirstPageWithDots() {
      return ((this.customizedLength > (this.wing * 3)) && (this.currentPage > (this.wing + 1)));
    },
    showLastPageWithDots() {
      /* eslint max-len: ["error", { "code": 130 }] */
      return (this.customizedLength > (this.wing * 3)) && ((this.currentPage + (this.wing + 2)) < this.customizedLength);
    },
  },
};
</script>
