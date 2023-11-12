class PromoteRateCalculator {
  #date;

  SPECIAL_PROMOE_DATE = [3, 10, 17, 24, 31];

  PRESENT_PRICE = 120000;

  WEEK_DISCOUNT = 2023;

  totalPromtionPrice = 0;

  benefitDetail;

  eventBage = '없음';

  constructor(totalPrice, orderMenu, date) {
    this.totalPrice = totalPrice;
    this.#date = date;
    this.orderMenu = orderMenu;
  }

  start() {
    this.totalBenefitPrice();
    this.totalBenefit();
    this.checkEventBadge();
  }

  checkEventBadge() {
    const { totalPromtionPrice } = this;

    if (totalPromtionPrice > 20000) {
      this.eventBage = '산타';
      return;
    }
    if (totalPromtionPrice > 10000) {
      this.eventBage = '트리';
      return;
    }
    if (totalPromtionPrice > 5000) {
      this.eventBage = '별';
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

    this.benefitDetail = benefitDetail;
  }

  totalBenefitPrice() {
    const { weekend, christmas, special, present } = this.getTotalBenefits();

    this.totalPromtionPrice = weekend + christmas + special + present;
  }

  getTotalBenefits() {
    const weekend = this.weekendDiscount();
    const christmas = this.christmas();
    const special = this.special();
    const present = this.present();

    const isHoliday = this.isWeekend();
    const category = isHoliday ? '주말' : '평일';

    return { weekend, christmas, special, present, category };
  }

  weekendDiscount() {
    const isHoliday = this.isWeekend();
    const category = isHoliday ? '디저트' : '메인';
    const menus = this.orderMenu[category];

    if (!menus) return 0;

    const totalDiscount = menus.reduce((acc, cur) => {
      const price = cur.quantity * this.WEEK_DISCOUNT;
      return acc + price;
    }, 0);

    return totalDiscount;
  }

  christmas() {
    if (this.#date > 25) return 0;

    const startPrice = 1000;
    const promotionPrice = 100;
    const date = this.#date - 1;
    const resultPrice = startPrice + date * promotionPrice;

    return resultPrice;
  }

  special() {
    const isSpecial = this.SPECIAL_PROMOE_DATE.includes(this.#date);

    return isSpecial ? 1000 : 0;
  }

  isWeekend() {
    const promteDate = '2023-12-';
    const day = new Date(`${promteDate}${this.#date}`).getDay();

    return day === 4 || day === 5;
  }

  present() {
    if (this.totalPrice > this.PRESENT_PRICE) {
      return 25000;
    }

    return 0;
  }
}

export default PromoteRateCalculator;
