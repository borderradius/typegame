import style from '../style.css';
import MainController from './controllers/mainController';

document.addEventListener('DOMContentLoaded', () => {
  MainController.init()
})

import {initialRoutes,historyRouterPush} from './router.js'

const historyAppDiv = document.querySelector('#app')

initialRoutes(historyAppDiv)
