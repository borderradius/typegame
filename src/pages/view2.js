import View from './view.js';
import {getList} from '../model/list'

const InputView = Object.create(View)

InputView.setup = function(el) {
  this.init(el)
  this.index = 0
  this.score = 0
  this.timer = ''
  this.result = []
  this.inputEl = el.querySelector('[type=text]')
  this.buttonEl = el.querySelector('#start')
  this.secondEl = el.querySelector('.second')
  this.scoreEl = el.querySelector('.score')
  this.testWordEl = el.querySelector('.test-word')
  this.bindEvents()
  this.getData()
    
  return this
}

InputView.reset = function() {
  console.warn('리셋 됌');
  clearInterval(this.timer)
  this.index = 0
  this.score = 0
  this.timer = ''
  this.result = []
  this.inputEl.innerText = ''
  this.buttonEl.innerText = '시작'
  this.inputEl.disabled = true
  this.inputEl.value = ''
  this.secondEl.innerText = ''
  this.scoreEl.innerText = ''
  this.testWordEl.innerText = ''
  this.getData()
}

InputView.bindEvents = function(){
  this.inputEl.addEventListener('keyup', e => this.onKeyup(e))
  this.buttonEl.addEventListener('click', e => this.onClick(e))
}

InputView.onKeyup = function(e) {
  if(e.keyCode === 13){
    console.warn(this.index);
    const isAnswer = this.inputEl.value === this.result[this.index].text
    if(isAnswer && this.index < this.result.length){
      this.index++
      if(this.index === this.result.length) {
        window.location.href = '/complete'
      }
      this.nextWord()
      this.inputEl.value = ''
      return false
    }
    this.inputEl.value = ''
    
  }
}

InputView.onClick = function() {
  if(this.buttonEl.textContent === '시작') {
    console.warn('시작버튼 눌렀을 떄');
    this.buttonEl.innerText = '초기화'
    this.inputEl.disabled = false
    this.nextWord()
  }else{
    console.warn('초기화버튼 눌렀을 때');
    this.reset()
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
  console.warn('다음단어 주세요');
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
  console.warn('카운트다운 시작 됌');
  clearInterval(this.timer)
  let second = this.result[this.index].second
  this.timer = setInterval(() => {
    second--
    this.secondEl.innerText = second
    if(!second) {
      console.warn('0초 일떄');
      clearInterval(this.timer)
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
  this.score--
  this.scoreEl.innerText = this.score
}

export default InputView

