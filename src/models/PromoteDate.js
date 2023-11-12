class PromoteDate {
  #date;

  constructor(date) {
    this.#date = date;
    this.#validtate(date);
  }

  #validtate(date) {
    if (!Number.isInteger(date) || date < 1) {
      throw new Error('[ERROR]');
    }
    if (date < 1 || date > 31) {
      throw new Error('[ERROR]');
    }
  }

  getDate() {
    return this.#date;
  }
}

export default PromoteDate;
