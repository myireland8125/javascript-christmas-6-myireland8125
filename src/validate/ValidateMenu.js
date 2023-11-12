import menu from '../datas/menu';

class ValidateMenu {
  constructor(menus) {
    this.menus = menus;
    this.#isValidateForm(this.menus);
    this.onlyMenus = menus.map(item => item.split('-')[0].trim());
    this.onlyQuantity = menus.map(item => Number(item.split('-')[1].trim()));
    this.menuCategory = Object.keys(menu);
  }

  start() {
    this.#hasMenu(this.onlyMenus, this.menuCategory);
    this.#hasDuplicte(this.onlyMenus);
    this.#isNumber(this.onlyQuantity);
  }

  #hasMenu(menus, menuCategory) {
    menus.forEach(name => {
      const isMenuIncluded = menuCategory.some(category =>
        this.#isMenuIncludedInCategory(category, name),
      );

      if (!isMenuIncluded) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
    });
  }

  #isMenuIncludedInCategory(category, name) {
    const menus = menu[category];
    return menus.some(item => item.name === name);
  }

  isExceedingQuantity(quantitys) {
    const sum = quantitys.reduce((acc, cur) => acc + cur, 0);

    if (sum >= 20) {
      throw new Error('[ERROR] 20개 이상 주문할 수 없어요.');
    }
  }

  #hasDuplicte(menus) {
    const newMenus = menus.map(item => item.split('-')[0].trim());
    const uniqueMenus = [...new Set(newMenus)]; // 중복 제거

    if (uniqueMenus.length !== newMenus.length) {
      throw new Error('[ERROR] 중복 메뉴는 포함 할 수 없어요.');
    }
  }

  #isNumber(quantitys) {
    quantitys.forEach(quantity => {
      if (!Number.isInteger(quantity) || quantity < 1) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
    });
  }

  #isValidateForm(menus) {
    const pattern = /^[가-힣A-Za-zㄱ-ㅎㅏ-ㅣ]+-\d+$/;

    menus.forEach(item => {
      if (!pattern.test(item)) {
        throw new Error(
          '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
        );
      }
    });
  }
}

export default ValidateMenu;
