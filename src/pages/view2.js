import View from './view.js';
import {getList} from '../model/List'

const InputView = Object.create(View)

InputView.setup = function(el) {
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.buttonEl = el.querySelector('#start')
  this.bindEvents()
  getList.then((val) => {
    this.result = val
    console.log(this.result);
  }).catch((reason) => {
    console.error('통신 실패 이유 : ',reason);
  })
  return this
}

InputView.bindEvents = function(){
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
  this.buttonEl.addEventListener('click', e => this.onClick(e))
}

InputView.onKeyup = function(e) {
  console.log(this.inputEl.value);
}

InputView.onClick = function() {
  this.emit('@submit', {data: 'clicked'})
}





export default InputView

