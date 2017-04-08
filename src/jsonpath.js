'use strict';


function _fixArrayOfOneIssue(input) {
    //return input;
    return (typeof input.push === 'function'
        && input.length === 1
        && typeof input[0] !== 'undefined')
            ? input[0] : input;
}

(function(){
    /**
     * Function wrapper
     * @param input
     * @returns _jacin
     */
    module.exports = function (object, query) {
        return _fixArrayOfOneIssue(require('JSONPath')({
            json: object,
            path: query
        }));
    };
})();
