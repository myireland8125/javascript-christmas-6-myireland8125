import EVENT_MENU from '../datas/evenMenu.js';
import ERROR_MESSAGE from '../consts/errorMsg.js';

const { inValidOrder } = ERROR_MESSAGE;

class ValidateMenu {
  constructor(menus) {
    this.menus = menus;
    this.#isValidateForm(this.menus);
    this.onlyMenus = menus.map(item => item.split('-')[0].trim());
    this.onlyQuantity = menus.map(item => Number(item.split('-')[1].trim()));
    this.menuCategory = Object.keys(EVENT_MENU);
  }

  start() {
    this.#hasMenu(this.onlyMenus, this.menuCategory);
    this.#hasDuplicte(this.onlyMenus);
    this.#isNumber(this.onlyQuantity);
    this.#isExceedingQuantity(this.onlyQuantity);
  }

  #hasMenu(menus, menuCategory) {
    menus.forEach(name => {
      const isMenuIncluded = menuCategory.some(category =>
        this.#isMenuIncludedInCategory(category, name),
      );

      if (!isMenuIncluded) {
        throw new Error(inValidOrder);
      }
    });
  }

  #isMenuIncludedInCategory(category, name) {
    const menus = EVENT_MENU[category];
    return menus.some(item => item.name === name);
  }

  #isExceedingQuantity(quantitys) {
    const sum = quantitys.reduce((acc, cur) => acc + cur, 0);

    if (sum >= 20) {
      throw new Error(inValidOrder);
    }
  }

  #hasDuplicte(menus) {
    const newMenus = menus.map(item => item.split('-')[0].trim());
    const uniqueMenus = [...new Set(newMenus)]; // 중복 제거

    if (uniqueMenus.length !== newMenus.length) {
      throw new Error(inValidOrder);
    }
  }

  #isNumber(quantitys) {
    quantitys.forEach(quantity => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(inValidOrder);
      }
    });
  }

  #isValidateForm(menus) {
    const pattern = /^[가-힣A-Za-zㄱ-ㅎㅏ-ㅣ]+-\d+$/;

    menus.forEach(item => {
      if (!pattern.test(item)) {
        throw new Error(inValidOrder);
      }
    });
  }
}

export default ValidateMenu;
