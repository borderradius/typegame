import Default from './default';
import { historyRouterPush } from '../router.js'

const ResultView = Object.create(Default)

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
  const historyAppDiv = document.querySelector('#app')
  historyRouterPush('/', historyAppDiv)
  this.emit('@goReset')
}

export default ResultView