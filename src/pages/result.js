import View from './view';
import { historyRouterPush } from '../router.js'

const ResultView = Object.create(View)

ResultView.setup = function(el) {
  this.init(el)
  this.totalScoreEl = el.querySelector('.total-score')
  this.totalScoreEl.innerText = history.state.score
  this.avgTimeEl = el.querySelector('.avg-time')
  this.avgTimeEl.innerText = history.state.solveTime
  this.resetEl = el.querySelector('.re-btn')

  this.bindEvent()
  return this
}

ResultView.bindEvent = function() {
  this.resetEl.addEventListener('click', e => this.onNextPage(e))
}

ResultView.onNextPage = function (e) {
  // console.warn(history);
  // history.go(-1)
  const historyAppDiv = document.querySelector('#history-app')
  historyRouterPush('/', historyAppDiv)
  this.emit('@goMain')
}

export default ResultView