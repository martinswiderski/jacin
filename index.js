'use strict';

(function(){
    /**
     * Function wrapper
     * @param input
     * @returns _jacin
     */
    module.exports = function (input) {
        return new (require('./src/jacin'))(input);
    };
})();
