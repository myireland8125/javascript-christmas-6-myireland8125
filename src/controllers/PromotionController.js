import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import PromoteDate from '../models/PromoteDate.js';
import PromoteMenu from '../models/PromoteMenu.js';
import PromoteRateCalculator from '../models/PromoteRateCalculator.js';
import PromoteMenuManager from '../models/PromoteMenuManager.js';

class PromotionController {
  inputView;

  promoteMenu;

  promoteDate;

  totalPrice;

  promoteRateCalculator;

  async start() {
    // 나누기
    const { printMessage } = OutputView;
    printMessage('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
    await this.setPromoteDate();
    await this.setMenu();

    const { orderCategory, orderMenu } = this.promoteMenu;
    const date = this.promoteDate.getDate();
    const promoteMenuManager = new PromoteMenuManager(orderCategory, orderMenu);
    this.totalPrice = promoteMenuManager.caculateTotalAmount();
    this.promoteRateCalculator = new PromoteRateCalculator(
      this.totalPrice,
      orderMenu,
      date,
    );
    this.promoteRateCalculator.start();
    this.printResult();
  }

  async setMenu() {
    const { printMessage } = OutputView;

    try {
      const selectedMenu = await this.promptMenu();
      this.promoteMenu = new PromoteMenu(selectedMenu);
      this.promoteMenu.order();
    } catch (error) {
      printMessage('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
      await this.setMenu();
    }
  }

  async setPromoteDate() {
    const { printMessage } = OutputView;

    try {
      const selectedDate = await this.propmtDate();
      const selecteNumberDate = Number(selectedDate);
      this.promoteDate = new PromoteDate(selecteNumberDate);
    } catch (error) {
      printMessage('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
      await this.setPromoteDate();
    }
  }

  async propmtDate() {
    return InputView.readDate();
  }

  async promptMenu() {
    return InputView.readMenu();
  }

  printOrders() {
    const { printMessage } = OutputView;
    const { orderCategory, orderMenu } = this.promoteMenu;

    printMessage('<주문 메뉴>');

    orderCategory.forEach(category =>
      orderMenu[category].forEach(({ name, quantity }) =>
        printMessage(`${name} ${quantity}개`),
      ),
    );
    printMessage('\n');
  }

  printTotalBenefit() {
    const { printMessage } = OutputView;
    const { benefitDetail } = this.promoteRateCalculator;

    printMessage('<혜택 내역>');
    benefitDetail.forEach(benefit => {
      printMessage(benefit);
    });

    printMessage('\n');
  }

  printGiven() {
    const { printMessage } = OutputView;
    const giveWay = this.totalPrice > 120000 ? '샴페인 1개' : '없음';
    printMessage(`<증정 메뉴>\n ${giveWay}\n`);
  }

  printTotalBenefitPrice() {
    const { printMessage } = OutputView;
    const { totalPromtionPrice } = this.promoteRateCalculator;
    const resultPrice = this.totalPrice - totalPromtionPrice + 25000;

    printMessage(
      `<총혜택 금액>\n -${totalPromtionPrice.toLocaleString()}원  \n`,
    );
    printMessage('<할인 후 예상 결제 금액>');
    printMessage(`${resultPrice.toLocaleString()}원  \n`);
  }

  printEventBadge() {
    const { printMessage } = OutputView;
    const { eventBage } = this.promoteRateCalculator;

    printMessage(`<12월 이벤트 배지>\n${eventBage}`);
  }

  printBenefit() {
    this.printGiven();
    this.printTotalBenefit();
    this.printTotalBenefitPrice();
    this.printEventBadge();
  }

  printResult() {
    const { printMessage, printNoneBenefit } = OutputView;
    printMessage('12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기! \n');
    this.printOrders();
    printMessage(
      `<할인 전 총주문 금액> \n ${this.totalPrice.toLocaleString()}원 \n`,
    );
    if (this.totalPrice < 10000) {
      printNoneBenefit(this.totalPrice);
      return;
    }
    this.printBenefit();
  }
}

export default PromotionController;
