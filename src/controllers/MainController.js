import GameView from '../pages/game';
import ResultView from '../pages/result';

export default {
  init() {
    const gameWrap = document.getElementsByClassName('game-wrap')
    GameView.setup(gameWrap[0]).on('@goComplete', e => this.goComplete(e))
  },

  goComplete(e) {
    console.warn('결과값? :',e.detail);
    const completeWrap = document.getElementsByClassName('complete-wrap')
    ResultView.setup(completeWrap[0], e.detail).on('@goReset', e => GameView.reset())
  },
}
