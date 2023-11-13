import PromoteRateCalculator from './../src/models/PromoteRateCalculator.js';

describe('Rate Calculator Test', () => {
  let calculator;

  beforeEach(() => {
    const orderMenus = [
      { getCategory: () => '디저트', getMenu: () => ({ quantity: 2 }) },
    ];
    const totalPrice = 50000;
    const date = 10; //평일

    calculator = new PromoteRateCalculator(totalPrice, orderMenus, date);
  });

  test('weekendDiscount', () => {
    const result = calculator.weekendDiscount();
    expect(result).toBe(2 * 2023);
  });

  test('메뉴의 갯수 별로 합산이 정상적으로 적용된다.', () => {
    const menus = [{ getMenu: () => ({ quantity: 2 }) }];
    const result = calculator.calculateMenuPrice(menus);
    const totalNumber = 2 * 2023;

    expect(result).toBe(totalNumber);
  });
});

describe('크리스마스 프로모션 이벤트', () => {
  let calculator;

  test('크리스마스 할인률이 정상적으로 적용된다.', () => {
    const orderMenus = [
      { getCategory: () => '디저트', getMenu: () => ({ quantity: 2 }) },
    ];
    const totalPrice = 50000;
    const date = 10;
    calculator = new PromoteRateCalculator(totalPrice, orderMenus, date);
    const result = calculator.christmas();

    expect(result).toBe(1000 + 9 * 100);
  });

  test('25일이 넘어가면 할인률이 0이 된다.', () => {
    const orderMenus = [
      { getCategory: () => '디저트', getMenu: () => ({ quantity: 2 }) },
    ];
    const totalPrice = 50000;
    const date = 30;
    calculator = new PromoteRateCalculator(totalPrice, orderMenus, date);
    const result = calculator.christmas();

    expect(result).toBe(0);
  });
});

describe('증정 이벤트 ', () => {
  let calculator;

  test('특별 할인 날짜에 포함되어있으면 1000원 할인이 되어야 한다.', () => {
    const orderMenus = [
      { getCategory: () => '디저트', getMenu: () => ({ quantity: 2 }) },
    ];
    const totalPrice = 50000;
    const date = 10;

    calculator = new PromoteRateCalculator(totalPrice, orderMenus, date);
    expect(calculator.special()).toBe(1000);
  });

  test('특별 할인 날짜에 포함되어 있지 않으면 할인 금액이 0원이 되어야 한다.', () => {
    const orderMenus = [
      { getCategory: () => '디저트', getMenu: () => ({ quantity: 2 }) },
    ];
    const totalPrice = 50000;
    const date = 11;

    calculator = new PromoteRateCalculator(totalPrice, orderMenus, date);
    expect(calculator.special()).toBe(0);
  });
});
