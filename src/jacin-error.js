'use strict';

module.exports = function Ca71738c(
    message,
    details
) {
    this.message = message;
    this.details = (typeof details === 'undefined') ? null : details;
    Error.captureStackTrace && Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.toString = function() {
        return JSON.stringify(this);
    };
};
