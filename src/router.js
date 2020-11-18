import About from './pages/about.html';
// import Home from './pages/home.html';
import {template} from './pages/about.js';

console.warn(template);
const routes = {
  '/': template,
  '/home': template,
  '/about': About
}

// entry point
function initialRoutes (mode, el) {
  renderHTML(el, routes['/'])

  if (mode === 'history') {
    window.onpopstate = () => renderHTML(el, routes[window.location.pathname])
  } else {
    window.addEventListener('hashchange', () => {
      return renderHTML(el, getHashRoute())
    })
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