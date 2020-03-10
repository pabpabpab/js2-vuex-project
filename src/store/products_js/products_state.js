export default {
  mode: '', // сохранить режим просмотра
  featuredProductsUrl: '/api/featured-products',
  youMayLikeAlsoUrl: '/api/also-products',
  catalogUrl: '/api/products',
  products: [],
  filtered: [],
  customized: [[], [], []], // товары из filtered, разбитые по страницам
  sizeArr: [], // установки пользователя в фильтре размеров
  priceLimit: 80, // установка пользователя в фильтре цены
  searchString: '', // установка пользователя в строке поиска в хедере

  // установка пользователем в выпадающем списке кол-ва товаров на страницу
  productQuantityPerPage: 9,
  currentPage: 0, // текущая страница в пагинаторе
  activePaginationLinkCss: 'pagination_link active_pagination_link',
  inactivePaginationLinkCss: 'pagination_link',
  paginationLinkCssArr: ['', '', ''],
  paginationLinksShot: [1, 2, 3, 4, 5, 6], // активный кадр ссылок пагинации
  half_length_of_pagination_shot: 3, // половинка длины активного кадра ссылок пагинации
};
