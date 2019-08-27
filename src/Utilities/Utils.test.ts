const Ja = require('./../seats.json');
import {generateState,selectSeats} from './Utils';


let a:number[][]=[
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,1,1]
]
console.log(selectSeats(a,10,1,3))