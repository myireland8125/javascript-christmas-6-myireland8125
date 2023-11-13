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
    if (this.#totalPromtionPrice > 20000) {
      this.#eventBage = '산타';
      return;
    }
    if (this.#totalPromtionPrice > 10000) {
      this.#eventBage = '트리';
      return;
    }
    if (this.#totalPromtionPrice > 5000) {
      this.#eventBage = '별';
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
    const category = isHoliday ? '주말' : '평일';

    return { weekend, christmas, special, present, category };
  }

  weekendDiscount() {
    const WEEK_DISCOUNT = 2023;
    const isHoliday = this.isWeekend();
    const category = isHoliday ? '디저트' : '메인';
    const menus = this.orderMenus.filter(
      menu => menu.getCategory() === category,
    );
    if (!menus) return 0;
    const totalDiscount = menus.reduce((acc, cur) => {
      const price = cur.quantity * WEEK_DISCOUNT;
      return acc + price;
    }, 0);
    return totalDiscount;
  }

  christmas() {
    if (this.#date > 25) return 0;

    const START_PRICE = 1000;
    const PROMOTION_PRICE = 100;
    const date = this.#date - 1;
    const resultPrice = START_PRICE + date * PROMOTION_PRICE;

    return resultPrice;
  }

  special() {
    const SPECIAL_PROMOE_DATE = [3, 10, 17, 24, 31];
    const isSpecial = SPECIAL_PROMOE_DATE.includes(this.#date);

    return isSpecial ? 1000 : 0;
  }

  isWeekend() {
    const promteDate = '2023-12-';
    const day = new Date(`${promteDate}${this.#date}`).getDay();

    return day === 4 || day === 5;
  }

  present() {
    const PRESENT_LIMIT_PRICE = 120000;

    if (this.#totalPrice > PRESENT_LIMIT_PRICE) {
      return 25000;
    }

    return 0;
  }
}

export default PromoteRateCalculator;
