export default function sizeFilterCore(products, sizeArr) {
  return products.filter((el) => sizeArr.includes(el.size));
}
