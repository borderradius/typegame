import View from './view.js';
import {getList} from '../model/list'

const InputView = Object.create(View)

InputView.setup = function(el) {
  this.init(el)
  this.result = []
  this.index = 0
  this.inputEl = el.querySelector('[type=text]')
  this.buttonEl = el.querySelector('#start')
  this.secondEl = el.querySelector('.second')
  this.scoreEl = el.querySelector('.score')
  this.testWordEl = el.querySelector('.test-word')
  this.score = 0
  this.bindEvents()
  this.getData()
    
  return this
}

InputView.bindEvents = function(){
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
  this.buttonEl.addEventListener('click', e => this.onClick(e))
}

InputView.onKeyup = function(e) {
  if(e.keyCode === 13){
    const isAnswer = this.inputEl.value === this.result[this.index].text
    console.warn(this.index);
    if(isAnswer && this.index < this.result.length){
      this.index++
      if(this.index === this.result.length -1) return
      this.nextWord()
      this.inputEl.value = ''
      return false
    }
    this.inputEl.value = ''
    
  }
}

InputView.onClick = function() {
  if(this.buttonEl.textContent === '시작') {
    this.buttonEl.innerText = '초기화'
    this.nextWord()
  }else{
    this.buttonEl.innerText = '시작'
  }
}

InputView.getData = function() {
  getList('https://my-json-server.typicode.com/kakaopay-fe/resources/words')
    .then((rs) => {
      this.result = rs
    })
    .catch((err) => {
      console.log('통신 에러 : ', err)
    })
}

InputView.nextWord = function() {
  this.printData()
  // countDown()
}


/**
 * 화면에 데이터 뿌림
 */
InputView.printData = function() {
  this.score = this.result.length
  this.secondEl.innerText = this.result[this.index].second
  this.testWordEl.innerText = this.result[this.index].text
  this.scoreEl.innerText = this.score
}

/**
   * 시작하자마자 시간이 흘러가야함
   * 0초 = 새로운 시간 , 새로운 단어
   * */
InputView.countDown = function () {
  let second = this.result[this.index].second
  const timer = setInterval(() => {
    second--
    this.secondEl.innerText = second
    if(!second) {
      clearInterval(timer)
      // 점수차감
      deductScore(this.scoreEl)
    }
  }, 1000);
}

/**
 * 점수 차감
 */
const deductScore = function (el) {
  let score = Number(el.textContent)
  el.innerText = --score
}

export default InputView

