import InputView from '../pages/view2';

const tag = '[mainController]'

export default {
  init() {
    console.log(tag);
    const gameWrap = document.getElementsByClassName('game-wrap')
    InputView.setup(gameWrap[0])
  }
}