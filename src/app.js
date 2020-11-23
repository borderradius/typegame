import moduleName from '../src/style.css';
import MainController from './controllers/mainController';
import {initialRoutes} from './router.js'

document.addEventListener('DOMContentLoaded', () => {
  MainController.init()
})

const historyAppDiv = document.querySelector('#app')

initialRoutes(historyAppDiv)
