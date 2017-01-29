/**
 * Created by serg on 1/29/17.
 */

const literal = require('./literal.js');

class clause {

    constructor(str, symbols) {
        this.literals = [];

        let strLiterals = str.split('|');
        for (let i in strLiterals) {
            let currentLiteral = new literal(strLiterals[i]);
            let currentSymbol = checkAndAdd(symbols, currentLiteral.symbol, (a, b) => a.name == b.name);
            currentLiteral.symbol = currentSymbol;
            this.literals.push(currentLiteral);
        }
    }

    get value() {
        for (let i in this.literals) {

            if (this.literals[i].value == undefined)
                return undefined;

            if (this.literals[i].value == true)
                return true;
        }
        return false;
    }

    get isUnit() {
        if (this.literals.length == 1)
            this.literals[0];

        let numberOfFalses = 0;
        let nonFalseLiteral;
        for (let i in this.literals) {
            if (this.literals[i].value == false)
                numberOfFalses++;
            else
                nonFalseLiteral = this.literals[i];
        }
        if (numberOfFalses == this.literals.length - 1)
            return nonFalseLiteral;
        return false;
    }

}

function checkAndAdd(array, elem, comparator) {
    for (let i in array) {
        if (comparator(array[i], elem))
            return array[i];
    }
    array.push(elem);
    return elem;
}

module.exports = clause;