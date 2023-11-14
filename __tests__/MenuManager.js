import PromoteMenuManager from './../src/models/PromoteMenuManager.js';
import ERROR_MESSAGE from '../src/consts/errorMsg.js';

const { inValidOrder } = ERROR_MESSAGE;

describe('MenuManger Test', () => {
  test('카테고리 배열에 음료만 있으면 에러를 던져야 한다.', () => {
    const orderCategory = ['음료'];
    const orderMenus = [{ getMenu: () => ({ price: 1000, quantity: 2 }) }];
    expect(
      () => new PromoteMenuManager(orderCategory, orderMenus),
    ).toThrowError(inValidOrder);
  });

  test('주문한 메뉴들의 가격을 합산한다.', () => {
    const orderCategory = ['메인'];
    const orderMenus = [
      { getMenu: () => ({ price: 1000, quantity: 2 }) },
      { getMenu: () => ({ price: 5000, quantity: 3 }) },
    ];
    const promoteMenuManager = new PromoteMenuManager(
      orderCategory,
      orderMenus,
    );

    const expectedTotalPrice = 1000 * 2 + 5000 * 3;

    expect(promoteMenuManager.getTotalPrice()).toBe(expectedTotalPrice);
  });
});
