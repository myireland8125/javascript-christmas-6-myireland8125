import ERROR_MESSAGE from '../consts/errorMsg.js';
import { MENU_CATEGORY } from '../consts/event.js';

const { drink } = MENU_CATEGORY;
const { inValidOrder } = ERROR_MESSAGE;

class PromoteMenuManager {
  #orderMenus;

  #totalMenuPrice;

  constructor(orderCategory, orderMenus) {
    this.#orderMenus = orderMenus;
    this.#isOnlyDrink(orderCategory);
    this.#calculate();
  }

  #isOnlyDrink(orderCategory) {
    if (orderCategory.length === 1 && orderCategory.includes(drink)) {
      throw new Error(inValidOrder);
    }
  }

  #calculate() {
    const totalMenuPrice = this.#orderMenus.reduce((acc, cur) => {
      const { price, quantity } = cur.getMenu();
      const totalPrice = price * quantity;
      return acc + totalPrice;
    }, 0);

    this.#totalMenuPrice = totalMenuPrice;
  }

  getTotalPrice() {
    return this.#totalMenuPrice;
  }
}

export default PromoteMenuManager;
