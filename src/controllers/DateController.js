import InputView from '../views/InputView.js';
import OutputView from '../views/OutputView.js';
import Date from '../models/Date.js';
import ERROR_MESSAGE from '../consts/errorMsg.js';

const { inValidDate } = ERROR_MESSAGE;

class DateController {
  #date;

  async setPromoteDate() {
    const { printMessage } = OutputView;

    try {
      const selectedDate = await this.propmtDate();
      const selecteNumberDate = Number(selectedDate);
      const date = new Date(selecteNumberDate).getDate();

      this.#date = date;
    } catch (error) {
      printMessage(inValidDate);
      await this.setPromoteDate();
    }
  }

  async propmtDate() {
    return InputView.readDate();
  }

  getDate() {
    return this.#date;
  }
}

export default DateController;
