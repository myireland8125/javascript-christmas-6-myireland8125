class PromoteMenuManager {
  #orderMenus;

  #totalMenuPrice;

  constructor(orderCategory, orderMenus) {
    this.#orderMenus = orderMenus;
    this.#isOnlyDrink(orderCategory);
    this.#calculate();
  }

  #isOnlyDrink(orderCategory) {
    if (orderCategory.length === 1 && orderCategory.includes('음료')) {
      throw new Error('[ERROR] 음료만 주문은 불가능해요.');
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
