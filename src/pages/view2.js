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
    if(isAnswer && this.index < this.result.length){
      this.index++
      if(this.index === this.result.length) return // 완료페이지로 넘어가기 해야함.
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
      this.score = rs.length
    })
    .catch((err) => {
      console.log('통신 에러 : ', err)
    })
}

InputView.nextWord = function() {
  this.printData()
  this.countDown()
}


/**
 * 화면에 데이터 뿌림
 */
InputView.printData = function() {
  this.secondEl.innerText = this.result[this.index].second
  this.testWordEl.innerText = this.result[this.index].text
  this.scoreEl.innerText = this.score
}

/**
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
      this.deductScore() // 0초일때 점수차감
      this.index++
      this.nextWord() // 0초일때 다음단어로 넘어감
    }
  }, 1000);
}

/**
 * 점수 차감
 */
InputView.deductScore = function () {
  // this.score = this.score -1
  // console.log(typeof this.score);
  this.score--
  this.scoreEl.innerText = this.score
  // let score = Number(el.textContent)
  // el.innerText = --score
}

export default InputView

