import BADGES from '../datas/eventBadge.js';
import { EVENT_DATA, WEEK, MENU_CATEGORY } from '../consts/event.js';

const { specialEvent, christMasEvent, presentEvent, weekEvent } = EVENT_DATA;

class PromoteRateCalculator {
  #date;

  #totalPrice;

  #totalPromtionPrice = 0;

  #eventBage = '없음';

  #benefitDetail;

  constructor(totalPrice, orderMenus, date) {
    this.#totalPrice = totalPrice;
    this.#date = date;
    this.orderMenus = orderMenus;
  }

  getEventBadget() {
    return this.#eventBage;
  }

  getBenefitDetail() {
    return this.#benefitDetail;
  }

  getTotalPromtionPrice() {
    return this.#totalPromtionPrice;
  }

  start() {
    this.totalBenefitPrice();
    this.totalBenefit();
    this.checkEventBadge();
  }

  checkEventBadge() {
    const { star, tree, santa } = BADGES;

    if (this.#totalPromtionPrice > santa.limitPrice) {
      this.#eventBage = santa.label;
      return;
    }
    if (this.#totalPromtionPrice > tree.limitPrice) {
      this.#eventBage = tree.label;
      return;
    }
    if (this.#totalPromtionPrice > star.limitPrice) {
      this.#eventBage = star.label;
    }
  }

  totalBenefit() {
    const { weekend, christmas, special, present, category } =
      this.getTotalBenefits();

    const benefitDetail = [
      `크리스마스 디데이 할인: -${christmas.toLocaleString()}원`,
      `${category} 할인: -${weekend.toLocaleString()}원`,
      `특별 할인: -${special.toLocaleString()}원`,
      `증정 이벤트: -${present.toLocaleString()}원`,
    ];

    this.#benefitDetail = benefitDetail;
  }

  totalBenefitPrice() {
    const { weekend, christmas, special, present } = this.getTotalBenefits();

    this.#totalPromtionPrice = weekend + christmas + special + present;
  }

  getTotalBenefits() {
    const weekend = this.weekendDiscount();
    const christmas = this.christmas();
    const special = this.special();
    const present = this.present();

    const isHoliday = this.isWeekend();
    const category = isHoliday ? WEEK.weekend : WEEK.weekdays;

    return { weekend, christmas, special, present, category };
  }

  weekendDiscount() {
    const { main, dessert } = MENU_CATEGORY;

    const isHoliday = this.isWeekend();
    const category = isHoliday ? main : dessert;

    const menus = this.orderMenus.filter(
      menu => menu.getCategory() === category,
    );

    if (menus.length === 0) return 0;

    const totalDiscount = this.calculateMenuPrice(menus);
    return totalDiscount;
  }

  calculateMenuPrice(menus) {
    const { discountPrice } = weekEvent;

    const totalDiscount = menus.reduce((acc, cur) => {
      const { quantity } = cur.getMenu();
      const price = quantity * discountPrice;
      return acc + price;
    }, 0);

    return totalDiscount;
  }

  christmas() {
    const { limitDate, startPrice, discountPrice } = christMasEvent;
    if (this.#date > limitDate) return 0;

    const date = this.#date - 1;
    const resultPrice = startPrice + date * discountPrice;

    return resultPrice;
  }

  special() {
    const { promoteDates, discountPrice } = specialEvent;

    const isSpecial = promoteDates.includes(this.#date);

    return isSpecial ? discountPrice : 0;
  }

  isWeekend() {
    const promteDate = '2023-12-';
    const day = new Date(`${promteDate}${this.#date}`).getDay();

    return day === 5 || day === 6;
  }

  present() {
    const { champagne, limitPrice } = presentEvent;

    if (this.#totalPrice > limitPrice) {
      return champagne.price;
    }

    return 0;
  }
}

export default PromoteRateCalculator;
