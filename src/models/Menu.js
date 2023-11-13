class Menu {
  #name;

  #price;

  #quantity;

  #category;

  constructor(name, price, quantity, category) {
    this.#name = name;
    this.#price = price;
    this.#quantity = quantity;
    this.#category = category;
  }

  getMenu() {
    return {
      name: this.#name,
      price: this.#price,
      quantity: this.#quantity,
    };
  }

  getCategory() {
    return this.#category;
  }
}
export default Menu;
