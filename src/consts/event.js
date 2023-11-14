const EVENT_DATA = Object.freeze({
  specialEvent: {
    promoteDates: [3, 10, 17, 24, 31],
    discountPrice: 1000,
  },
  christMasEvent: {
    limitDate: 25,
    discountPrice: 100,
    startPrice: 1000,
  },
  presentEvent: {
    limitPrice: 120000,
    champagne: { name: '샴페인', price: 25000, quantity: 1 },
  },
  weekEvent: {
    discountPrice: 2023,
  },
});

const WEEK = Object.freeze({ weekend: '주말', weekdays: '평일' });

const MENU_CATEGORY = Object.freeze({
  main: '메인',
  dessert: '디저트',
  drink: '음료',
  appetizer: '에피타이저',
});

export { EVENT_DATA, WEEK, MENU_CATEGORY };
