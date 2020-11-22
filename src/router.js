import Result from './template/result.js';
import Home from './template/home.js';

const routes = {
  '/': Home,
  '/complete': Result
}

function initialRoutes (mode, el) {
  renderHTML(el, routes['/'])

  if (mode === 'history') {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
  } 
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