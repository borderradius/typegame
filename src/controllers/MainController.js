import GameView from '../pages/game';
import ResultView from '../pages/result';

export default {
  init() {
    const gameWrap = document.getElementsByClassName('game-wrap')
    GameView.setup(gameWrap[0]).on('@goComplete', e => this.goComplete())
  },

  goComplete() {
    const completeWrap = document.getElementsByClassName('complete-wrap')
    ResultView.setup(completeWrap[0]).on('@goMain', e => this.goMain())
  },

  goMain() {
    GameView.reset()
  }
}