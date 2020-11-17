import { sum } from './math.js';
import style from '../style.css';
import { getList } from './model/List';

console.log(sum(1, 2))
try {
  console.log(getList())
} catch (e) {
  console.error(e);
}


