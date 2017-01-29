/**
 * Created by serg on 1/29/17.
 */

const clause = require('./clause.js');
const symbol = require('./symbol.js');
const literal = require('./literal.js');

class CNS {
    constructor(str) {
        this.clauses = [];
        this.symbols = [];


        //remove white spaces
        str = str.replace(/\s+/g, '');

        let strClauses = str.split('&');

        for (let i in strClauses) {
            this.clauses.push(new clause(strClauses[i], this.symbols));
        }

        console.log(JSON.stringify(this));
    }

    static DPLL(cns, model = {}) {
        let allTrue = true;

        for (let i in cns.clauses) {
            if (cns.clauses[i].value == undefined) {
                allTrue = false;
                break;
            }
            if (cns.clauses[i].value == false)
                return false;
        }
        if (allTrue)
            return true;

        //not sure why i need the model in this case
        //probably remove this
        let pureSymbolObj = cns.findPureSymbol(model);
        if (pureSymbolObj) {
            if (pureSymbolObj.sign == literal.signs.positive)
                pureSymbolObj.symbol.value = true;
            else
                pureSymbolObj.symbol.value = false;

            return CNS.DPLL(cns, model);
        }

        let unitClause;
        let unitClauseLiteral;

        for (let i in this.clauses) {
            unitClauseLiteral = this.clauses[i].isUnit;
            if (unitClauseLiteral) {
                unitClause = ths.clauses[i];
                break;
            }
        }
        if (unitClause) {
            if (unitClauseLiteral.sign == literal.signs.positive)
                unitClauseLiteral.symbol.value = true;
            else
                pureSymbolObj.symbol.value = false;

            return DPLL(cns, model);
        }

        let firstNonAsignedSymbol;
        for (let i in cns.symbols)
            if (cns.symbols[i].value == undefined) {
                firstNonAsignedSymbol = cns.symbols[i];
                break;
            }

        //this is awful, probably need to fix this
        let symbolCache = [];
        for (let i in cns.symbols) {
            symbolCache[i] = cns.symbols[i].value;
        }

        firstNonAsignedSymbol.value = true;
        let res = CNS.DPLL(cns);
        if (res)
            return true;

        for (let i in cns.symbols)
            cns.symbols[i].value = symbolCache[i];
        firstNonAsignedSymbol.value = false;

        return CNS.DPLL(cns);

    }

    findPureSymbol(model = {}) {
        //todo: optimize this for known variables from the model
        for (let i in this.symbols) {
            let currentSymbol = this.symbols[i];
            if (currentSymbol.value != undefined)
                continue;
            let sign = undefined;
            let next = false;

            for (let j in this.clauses) {
                let literals = this.clauses[j].literals;

                for (let k in literals) {
                    if (literals[k].symbol != currentSymbol)
                        continue;
                    if (sign == undefined)
                        sign = literals[k].sign;
                    else if (sign != literals[k].sign) {
                        next = true;
                        break;
                    }
                }
                if (next)
                    break;
            }
            if (!next)
                return {symbol: currentSymbol, sign: sign};
        }
        return undefined;
    }

}

module.exports = CNS;