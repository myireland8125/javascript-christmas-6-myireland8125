class PromoteMenuManager {
  constructor(orderCategory, orderMenu) {
    this.isOnlyDrink(orderCategory);
    this.orderCategory = orderCategory;
    this.orderMenu = orderMenu;
  }

  isOnlyDrink(orderCategory) {
    if (orderCategory.length === 1 && orderCategory.includes('음료')) {
      throw new Error('[ERROR] 음료만 주문은 불가능해요.');
    }
  }

  caculateTotalAmount() {
    const totalPrice = this.orderCategory.reduce((acc, category) => {
      const sum = this.orderMenu[category].reduce(this.calculateItemTotal, 0);
      return sum + acc;
    }, 0);

    return totalPrice;
  }

  calculateItemTotal(acc, cur) {
    const totalPrice = cur.price * cur.quantity;
    return acc + totalPrice;
  }
}

export default PromoteMenuManager;
