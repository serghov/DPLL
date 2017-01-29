/**
 * Created by serg on 1/29/17.
 */

class symbol {
    constructor(name) {
        name = name.replace(/-|{|}/g, '');

        this.name = name;
        this.value = undefined;
    }
}

module.exports = symbol;