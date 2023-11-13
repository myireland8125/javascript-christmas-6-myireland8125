import OutputView from '../views/OutputView.js';

class ResultController {
  #orderMenus;

  #totalPrice;

  constructor(promoteRateCalculator, totalPrice, orderMenus) {
    this.promoteRateCalculator = promoteRateCalculator;
    this.#totalPrice = totalPrice;
    this.#orderMenus = orderMenus;
  }

  printOrders() {
    const { printMessage } = OutputView;

    printMessage('<주문 메뉴>');

    this.#orderMenus.forEach(menu => {
      const { name, quantity } = menu.getMenu();
      printMessage(`${name} ${quantity}개`);
    });

    printMessage('\n');
  }

  printTotalBenefit() {
    const { printMessage } = OutputView;
    const benefitDetail = this.promoteRateCalculator.getBenefitDetail();

    printMessage('<혜택 내역>');
    benefitDetail.forEach(benefit => {
      printMessage(benefit);
    });

    printMessage('\n');
  }

  printGiven() {
    const PRESENT_LIMIT_RPICE = 120000;
    const { printMessage } = OutputView;
    const condition = this.#totalPrice > PRESENT_LIMIT_RPICE;
    const giveWay = condition ? '샴페인 1개' : '없음';

    printMessage(`<증정 메뉴>\n ${giveWay}\n`);
  }

  printTotalBenefitPrice() {
    const { printMessage } = OutputView;

    const totalPromtionPrice =
      this.promoteRateCalculator.getTotalPromtionPrice();
    const { present } = this.promoteRateCalculator.getTotalBenefits();
    const resultPrice = this.#totalPrice - totalPromtionPrice + present;

    printMessage(
      `<총혜택 금액>\n -${totalPromtionPrice.toLocaleString()}원 \n`,
    );
    printMessage('<할인 후 예상 결제 금액>');
    printMessage(`${resultPrice.toLocaleString()}원 \n`);
  }

  printEventBadge() {
    const { printMessage } = OutputView;
    const eventBage = this.promoteRateCalculator.getEventBadget();

    printMessage(`<12월 이벤트 배지>\n${eventBage}`);
  }

  printBenefit() {
    this.printGiven();
    this.printTotalBenefit();
    this.printTotalBenefitPrice();
    this.printEventBadge();
  }

  print() {
    const PROMOTE_LIMIT_RPICE = 10000;
    const { printMessage, printNoneBenefit } = OutputView;
    printMessage('12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기! \n');
    this.printOrders();
    printMessage(
      `<할인 전 총주문 금액> \n ${this.#totalPrice.toLocaleString()}원 \n`,
    );
    if (this.#totalPrice < PROMOTE_LIMIT_RPICE) {
      printNoneBenefit(this.#totalPrice);
      return;
    }
    this.printBenefit();
  }
}
export default ResultController;
