export default function priceFilterCore(products, priceLimit) {
  return products.filter((el) => el.price <= priceLimit);
}
