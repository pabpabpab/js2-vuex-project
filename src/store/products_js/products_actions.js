import sizeFilterCore from './functions/size_filter_core';
import priceFilterCore from './functions/price_filter_core';


export default {
  /* eslint object-curly-newline: ["error", {
   "ObjectExpression": "always",
   "ObjectPattern": "never"
   }]
*/
  // ============================загрузка товаров с сервера============================
  initProducts({ dispatch, commit, getters, state }, mode) {
    commit('setMode', mode); // сохранить режим просмотра
    const url = getters.productsUrl(mode);
    dispatch('getJson', url).then((data) => {
      commit('setProducts', data);
      commit('setFiltered', data);
      // применить сохранившиеся фильтры
      if (mode === 'catalog') {
        dispatch('priceFilter', state.priceLimit);
        dispatch('sizeFilter', state.sizeArr);
      }
      // ниже передаю параметр из стора для совместимости,
      // так как данный action может вызываться из других компонентов с параметром
      dispatch('divideProductsIntoPages', state.productQuantityPerPage);
    });
  },
  // ==========================пагинация: какую страницу товара показать=======================
  showPage({ dispatch, commit, state, getters }, page) {
    const { customizedLength } = getters;
    let index;
    if (page < 0) {
      index = 0;
    } else if (page >= customizedLength) {
      index = customizedLength - 1;
    } else {
      index = page;
    }
    // установить указатель страницы на требуюмую
    commit('setCurrentPage', index);
    // сбросить css ссылок пагинации
    dispatch('resetPaginationLinkCss');
    // установить активный css-стиль ссылки для актуальной страницы
    commit('setPaginationLinkCssArrByIndex', {
      index,
      cssClass: state.activePaginationLinkCss,
    });
    // сформировать активный кадр ссылок пагинации
    dispatch('makePaginationLinksShot');
  },
  // ===============================разбить товары по страницам================================
  divideProductsIntoPages({ dispatch, commit, state, getters }, userProductQuantityPerPage) {
    commit('setProductQuantityPerPage', userProductQuantityPerPage);
    commit('setCurrentPage', 0); // указатель страниц на первую
    commit('clearCustomized'); // очистить массив товаров
    commit('clearPaginationLinkCssArr'); // очистить css ссылок пагинации
    // =====<разбиваем товары по страницам в соответствии со state.productQuantityPerPage>=====
    let pageCounter = 0;
    let productCounter = 0;
    // не применять productQuantityPerPage для других режимов просмотра кроме каталога
    const quantityPerPage = (getters.mode === 'catalog') ? getters.productQuantityPerPage : 1000000;
    //
    for (let i = 0; i < getters.filteredLength; i += 1) {
      // страница заполнена
      if (productCounter === quantityPerPage) {
        productCounter = 0;
        pageCounter += 1;
      }
      // начинаем следующую страницу товаров
      if (productCounter === 0) {
        // создаем следующую страницу товаров
        state.customized.push([]);
        // сделать ссылку на эту страницу товаров неактивной
        commit('pushIntoPaginationLinkCssArr', state.inactivePaginationLinkCss);
      }
      // пушим товар в страницу
      commit('pushProductIntoCustomized', {
        pageCounter,
        product: state.filtered[i],
      });
      productCounter += 1;
    }
    // =====</разбиваем товары по страницам в соответствии со state.productQuantityPerPage>=====
    // установить активную ссылку
    commit('setPaginationLinkCssArrByIndex', {
      index: state.currentPage,
      cssClass: state.activePaginationLinkCss,
    });
    // сформировать активный кадр ссылок пагинации
    dispatch('makePaginationLinksShot');
  },
  // ========================сформировать активный кадр ссылок пагинации========================
  makePaginationLinksShot({ commit, state, getters }) {
    const { customizedLength, currentPage } = getters;
    let border1;
    let border2;
    const wing = state.half_length_of_pagination_shot;
    // очистить
    commit('clearPaginationLinksShot');
    // <если страниц мало>
    if (customizedLength <= wing * 3) {
      for (let i = 1; i <= customizedLength; i += 1) commit('pushIntoPaginationLinkShot', i);
      // ==============<все что ниже это когда страниц много>=============
      // =========<currentPage находится в конце блока пагинации>=========
    } else if ((currentPage + 1 + wing + 2) > customizedLength) {
      border1 = ((currentPage + 1 - wing) > (customizedLength - wing * 2))
        ? (customizedLength - wing * 2)
        : (currentPage + 1 - wing);
      border2 = customizedLength;
      for (let i = border1; i <= border2; i += 1) commit('pushIntoPaginationLinkShot', i);
      // =========<currentPage находится в начале блока пагинации>========
    } else if (currentPage + 1 - wing - 2 < 1) {
      border1 = 1;
      border2 = ((currentPage + 1 + wing) < (wing * 2))
        ? (wing * 2)
        : (currentPage + 1 + wing);
      for (let i = border1; i <= border2; i += 1) commit('pushIntoPaginationLinkShot', i);
      // ========<currentPage находится в середине блока пагинации>=======
    } else {
      border1 = currentPage + 1 - wing;
      border2 = currentPage + 1 + wing;
      for (let i = border1; i <= border2; i += 1) commit('pushIntoPaginationLinkShot', i);
    }
  },
  // ========================сбросить css ссылок пагинации==============================
  resetPaginationLinkCss({ state, getters, commit }) {
    const paginationCssArrLength = getters.paginationLinkCssArrLength;
    commit('clearPaginationLinkCssArr'); // очистить css ссылок пагинации
    for (let i = 0; i < paginationCssArrLength; i += 1) {
      commit('pushIntoPaginationLinkCssArr', state.inactivePaginationLinkCss);
    }
  },
  // ===============================сортировка==========================================
  sort({ dispatch, state }, userSort) {
    switch (userSort) {
      case 'Name':
        state.filtered.sort((prev, next) => {
          if (prev.product_name < next.product_name) return -1;
          if (prev.product_name < next.product_name) return 1;
          return 1;
        });
        break;
      case 'Price':
        state.filtered.sort((prev, next) => prev.price - next.price);
        break;
      case 'Size':
        state.filtered.sort((prev, next) => prev.size_number - next.size_number);
        break;
      default:
        state.filtered.sort((prev, next) => prev.price - next.price);
    }
    // разбить товары по страницам
    dispatch('divideProductsIntoPages', state.productQuantityPerPage);
  },
  // ==============================фильтрация по размеру=================================
  sizeFilter({ dispatch, commit, state }, userSizeArr) {
    let filtered;
    // затереть строку поиска в хедере
    commit('clearSearchString');
    // сохранить переданные данные (для составного фильтра)
    state.sizeArr = userSizeArr;
    // фильтрация products по размерам
    if (userSizeArr.length > 0) {
      filtered = sizeFilterCore(state.products, userSizeArr);
    } else {
      filtered = [...state.products];
    }
    commit('setFiltered', filtered);
    // если фильтр цены установлен, то применить и его
    if (state.priceLimit > 0) {
      filtered = priceFilterCore(state.filtered, state.priceLimit);
      commit('setFiltered', filtered);
    }
    // разбить товары по страницам
    dispatch('divideProductsIntoPages', state.productQuantityPerPage);
  },
  // =============================фильтрация по цене=====================================
  priceFilter({ dispatch, commit, state }, userPriceLimit) {
    let filtered;
    // затереть строку поиска в хедере
    commit('clearSearchString');
    // сохранить переданные данные (для составного фильтра)
    state.priceLimit = userPriceLimit;
    // фильтрация products по цене
    filtered = priceFilterCore(state.products, userPriceLimit);
    commit('setFiltered', filtered);
    // если фильтр по размерам установлен, то применить и его
    if (state.sizeArr.length > 0) {
      filtered = sizeFilterCore(state.filtered, state.sizeArr);
      commit('setFiltered', filtered);
    }
    // разбить товары по страницам
    dispatch('divideProductsIntoPages', state.productQuantityPerPage);
  },
  // =========================фильтрация по поисковой строке=============================
  filter({ dispatch, commit, state }, userSearch) {
    commit('clearSizeArr');
    commit('clearPriceLimit');
    // сохранить переданные данные
    state.searchString = userSearch;
    //
    const regexp = new RegExp(userSearch, 'i');
    const filtered = state.products.filter((el) => regexp.test(el.product_name));
    commit('setFiltered', filtered);
    // разбить товары по страницам
    dispatch('divideProductsIntoPages', state.productQuantityPerPage);
  },
};
