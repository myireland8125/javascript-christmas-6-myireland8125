import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu() {
    Console.print('<주문 메뉴>');
  },

  printMessage(message) {
    Console.print(message);
  },

  printNoneBenefit(totalPrice) {
    Console.print('<증정 메뉴>');
    Console.print('없음\n');
    Console.print('<혜택 내역>');
    Console.print('없음\n');
    Console.print('<총혜택 금액>');
    Console.print('없음\n');
    Console.print(
      `<할인 후 예상 결제 금액>\n ${totalPrice.toLocaleString()}원\n`,
    );
    Console.print('<12월 이벤트 배지>');
    Console.print('없음\n');
  },
};

export default OutputView;
