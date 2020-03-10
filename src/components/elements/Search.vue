<template>
  <form action="#" class="header__form">
    <div class="browse">
      Browse
      <div class="drop drop_browse">
        <div class="drop__flex">
          <h5 class="drop__h5">Women</h5>
          <ul class="drop__ul">
            <li><a href="#" class="drop__link">Dresses</a></li>
            <li><a href="#" class="drop__link">Tops</a></li>
            <li><a href="#" class="drop__link">Sweaters/Knits</a></li>
            <li><a href="#" class="drop__link">Jackets/Coats</a></li>
            <li><a href="#" class="drop__link">Blazers</a></li>
            <li><a href="#" class="drop__link">Denim</a></li>
            <li><a href="#" class="drop__link">Leggings/Pants</a></li>
            <li><a href="#" class="drop__link">Skirts/Shorts</a></li>
            <li><a href="#" class="drop__link">Accessories</a></li>
          </ul>
        </div>
      </div>
    </div>

    <input type="text"
           placeholder="Search for item..."
           class="searched_text_input"
           v-model="userSearch"
           @keyup.prevent="filter(userSearch)"
           v-if="routeName === 'CatalogPage'">
    <input type="text"
           placeholder="Search for item..."
           class="searched_text_input"
           v-model="userSearch"
           @keyup="gotoCatalog()"
           v-else>

    <button type="submit" class="search_button" @click.prevent>
      <i class="fas fa-search search-rotate"></i>
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Search',
  data() {
    return {
      userSearch: '',
    };
  },
  methods: {
    ...mapActions([
      'filter',
    ]),
    gotoCatalog() {
      this.$router.push({ name: 'CatalogPage' });
    },
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
    ...mapGetters([
      'searchString',
    ]),
  },
  watch: {
    $route(to, from) {
      if (from.name === 'CatalogPage') {
        this.userSearch = '';
      }
    },
    searchString() {
      this.userSearch = this.searchString; // обратная связь (от стора в v-model)
    },
  },
};
</script>
