<template>
  <div class="filterBody">
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="XXS"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">XXS</span>
    </label>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="XS"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">XS</span>
    </label>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="S"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">S</span>
    </label>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="M"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">M</span>
    </label><br>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="L"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">L</span>
    </label>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="XL"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">XL</span>
    </label>
    <label class="checkbox_label">
      <input type="checkbox" class="checkbox_input" value="XXL"
             v-model="userSizeSearch"
             @change="sizeFilter(userSizeSearch)"/>
      <span class="checkbox_text">XXL</span>
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SizeFilter',
  data() {
    return {
      userSizeSearch: [],
    };
  },
  methods: {
    ...mapActions([
      'sizeFilter',
    ]),
  },
  computed: {
    ...mapGetters([
      'sizeArr',
    ]),
  },
  watch: {
    sizeArr() {
      this.userSizeSearch = [...this.sizeArr]; // обратная связь (от стора в v-model)
    },
  },
  mounted() {
    this.userSizeSearch = [...this.sizeArr]; // обратная связь (от стора в v-model) при включении
  },
};
</script>
