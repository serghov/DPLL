/**
 * Created by serg on 1/29/17.
 */

const CNS = require('./CNS.js');


let str = '-{abc} | {Q_(1,2)} | -{P} & {R3} | {V} & {P_(2,1)}';

//str = 'a | b | c & d | e';
let cns = new CNS(str);

console.log(CNS.DPLL(cns));
console.log(cns.symbols);