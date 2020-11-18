import style from '../style.css';
// import { getList } from './model/List';


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
