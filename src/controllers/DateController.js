import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Date from '../models/Date.js';

class DateController {
  #date;

  async setPromoteDate() {
    const { printMessage } = OutputView;

    try {
      const selectedDate = await this.propmtDate();
      const selecteNumberDate = Number(selectedDate);

      this.#date = new Date(selecteNumberDate);
    } catch (error) {
      printMessage('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
      await this.setPromoteDate();
    }
  }

  async propmtDate() {
    return InputView.readDate();
  }

  getDate() {
    return this.#date.getDate();
  }
}
export default DateController;
