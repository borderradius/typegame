import Result from './template/result.js';
import Game from './template/game.js';

const routes = {
  '/': Game,
  '/complete': Result
}

function initialRoutes (el) {
  renderHTML(el, routes['/'])
  window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
}

function historyRouterPush (pathName, el, params = {}) {
  window.history.pushState(params, pathName, window.location.origin + pathName)
  renderHTML(el, routes[pathName])
}

function renderHTML (el, route) {
  el.innerHTML = route
}

export {
  initialRoutes,
  historyRouterPush
}