export default function checkUserInputs(userInputs) {
  const { inputColor, inputSize, inputQuantity } = userInputs;
  let message = '';
  if (!inputColor) {
    message += '- Не выбран цвет товара;<br>';
  }
  if (!inputSize) {
    message += '- Не выбран размер товара;<br>';
  }
  if (!inputQuantity) {
    message += '- Не указано количество товара;<br>';
  }
  if (message) {
    message += 'Товар не добавлен.';
  }
  return message;
}
