import Complete from './pages/complete.js';
import Home from './pages/home.js';
// import Home from './index.html';

const routes = {
  '/': Home,
  '/home': Home,
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
function historyRouterPush (pathName, el) {
  window.history.pushState({}, pathName, window.location.origin + pathName)
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