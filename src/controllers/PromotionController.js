import OutputView from '../views/OutputView.js';
import MenuController from './MenuController.js';
import DateController from './DateController.js';
import ResultController from './ResultController.js';
import PromoteRateCalculator from '../models/PromoteRateCalculator.js';

class PromotionController {
  #promoteRateCalculator;

  constructor() {
    this.menuController = new MenuController();
    this.dateController = new DateController();
    this.resultController = new ResultController();
  }

  async start() {
    const { printMessage } = OutputView;

    printMessage('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');

    await this.setDatas();
    this.calculate();
    this.print();
  }

  calculate() {
    const { totalPrice, orderMenus, date } = this.getPromoteDatas();

    this.#promoteRateCalculator = new PromoteRateCalculator(
      totalPrice,
      orderMenus,
      date,
    );
    this.#promoteRateCalculator.start();
  }

  print() {
    const { totalPrice, orderMenus } = this.getPromoteDatas();
    const resultController = new ResultController(
      this.#promoteRateCalculator,
      totalPrice,
      orderMenus,
    );

    resultController.print();
  }

  getPromoteDatas() {
    const totalPrice = this.menuController.getTotalPrice();
    const orderMenus = this.menuController.getOrderMenus();
    const date = this.dateController.getDate();

    return { totalPrice, orderMenus, date };
  }

  async setDatas() {
    await this.dateController.setPromoteDate();
    await this.menuController.setMenu();
  }
}

export default PromotionController;
