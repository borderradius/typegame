import Complete from './template/complete.js';
import Home from './template/home.js';
// import Home from './index.html';

const routes = {
  '/': Home,
  '/complete': Complete
}

// entry point
function initialRoutes (mode, el) {
  renderHTML(el, routes['/'])

  if (mode === 'history') {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
  } 
}

// set browser history
function historyRouterPush (pathName, el, params = {}) {
  window.history.pushState(params, pathName, window.location.origin + pathName)
  renderHTML(el, routes[pathName])
}

// render
function renderHTML (el, route) {
  el.innerHTML = route
}

export {
  initialRoutes,
  historyRouterPush
}