import View from './view.js';
import {getList} from '../model/list'

const InputView = Object.create(View)

InputView.setup = function(el) {
  this.init(el)
  this.inputEl = el.querySelector('[type=text]')
  this.buttonEl = el.querySelector('#start')
  this.secondEl = el.querySelector('.second')
  this.pointEl = el.querySelector('.point')
  this.testWordEl = el.querySelector('.test-word')
  this.bindEvents()

  this.getData()
  
    // 1초에 한번씩 rs[i].second 를 1차감한다
    // 차감된 rs[i].second 를 화면에 표시한다.
    // 차감된 시간이 0이면 다음 인덱스
    // 텍스트 입력이 완료되면 다음 인덱스

  // this.countDown = function(el, second){
    // console.log(second);
    // while (second > 0) {
    //   setTimeout(() => {
    //     console.log('settimeout run ? ');
    //     second--
    //     el.innerText = second  
    //   }, 1000);
    // }
  // }
    
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
  // this.emit('@submit', {data: 'clicked'})
}

InputView.getData = function() {
  getList('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
    .then((rs) => {
      this.result = rs
      this.secondEl.innerText = rs[0].second
      this.testWordEl.innerText = rs[0].text
      countDown(this.secondEl,rs[0].second)
    })
    .catch((err) => {
      console.log('통신 에러 : ', err)
    })
}

/**
   * 시작하자마자 시간이 흘러가야함
   * 
   * */
const countDown = function (el, second) {
  console.log(el, second);
  

  setInterval(() => {
    if (second < 1) clearInterval()
    second--
    el.innerText = second
  }, 1000);

  // while (second > 0) {
  //   setInterval(() => {
  //     second--
  //     el.innerText = second
  //   }, 1000);
  // }
}
export default InputView

