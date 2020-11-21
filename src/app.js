import style from '../style.css';
import MainController from './controllers/mainController';

document.addEventListener('DOMContentLoaded', () => {
  MainController.init()
  // const gameWrap = document.getElementsByClassName('game-wrap')
  // console.log(gameWrap);
  // View.setup(gameWrap[0])
  // const startBtn = document.getElementById('start')
  // console.log(View);
})

import {initialRoutes,historyRouterPush} from './router.js'

const historyAppDiv = document.querySelector('#history-app')

// Browser History
initialRoutes('history', historyAppDiv)

window.onload = () => {
  const historyLinker = document.querySelectorAll('span.history')

  historyLinker.forEach(el => {
    el.addEventListener('click', (evt) => {
      const pathName = evt.target.getAttribute('route')

      historyRouterPush(pathName, historyAppDiv)
    })
  })
}
