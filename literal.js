/**
 * Created by serg on 1/29/17.
 */

const symbol = require('./symbol.js');

class literal {

    constructor(str) {
        this._sign = literal.signs.negative;

        if (str.indexOf('-') == -1)
            this._sign = literal.signs.positive;


        this.symbol = new symbol(str);
    }

    get sign() {
        return this._sign;
    }

    get value() {
        if (this.symbol.value == undefined)
            return undefined;

        if (this.sign == literal.signs.positive)
            return this.symbol.value;
        else
            return !this.symbol.value;
    }
}

literal.signs = {
    positive: 0,
    negative: 1
};

module.exports = literal;