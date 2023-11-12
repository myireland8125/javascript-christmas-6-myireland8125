import PromotionController from './controllers/PromotionController.js';

class App {
  async run() {
    const promotionConrtoller = new PromotionController();
    await promotionConrtoller.start();
  }
}

export default App;
