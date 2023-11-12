import menu from '../datas/menu';
import ValidateMenu from './../validate/ValidateMenu.js';

class PromoteMenu {
  menus;

  orderMenu = {};

  orderCategory;

  menuCategory;

  constructor(menus) {
    this.menus = menus.split(',').map(item => item.trim());
    this.validateMenu = new ValidateMenu(this.menus);
    this.menuCategory = Object.keys(menu);
  }

  order() {
    this.validateMenu.start(this.menus);
    const orderMenus = this.createMenus(this.menus); // 입력받은 주문 리스트를 객체화
    this.initOrderMenus(orderMenus);
  }

  initOrderMenus(orderMenus) {
    this.menuCategory.forEach(category => {
      menu[category].forEach(item => {
        this.setOrderMenus(orderMenus, item, category);
      });
    });

    this.setOrderCategory();
  }

  createMenus() {
    const menus = this.menus.map(item => {
      const [name, quantity] = item.split('-').map(str => str.trim());
      return { name, quantity: Number(quantity) };
    });

    return menus;
  }

  setOrderCategory() {
    this.orderCategory = Object.keys(this.orderMenu);
  }

  setOrderMenus(orderMenus, item, category) {
    const { name: itenName, price } = item;
    const matchedMenu = orderMenus.find(
      orderMenu => orderMenu.name === itenName,
    );

    if (!matchedMenu) {
      return;
    }

    this.orderMenu[category] = this.orderMenu[category] || [];
    this.orderMenu[category].push({ ...matchedMenu, price });
  }
}

export default PromoteMenu;
