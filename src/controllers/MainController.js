import InputView from '../pages/view2';

const tag = '[MainController]'

export default {
  init() {
    console.log(tag, 'init()');
    const gameWrap = document.getElementsByClassName('game-wrap')
    InputView.setup(gameWrap[0])
  }
}