"use strict";

var fs = require('fs'),
    endPromise;

endPromise = function() {
    var instance = this;
    return new Promise(function(fulfill, reject) {
        var finishFunc, errorFunc;
        finishFunc = function() {
            instance.removeListener('error', errorFunc);
            fulfill();
        };
        errorFunc = function(e) {
            instance.removeListener('finish', finishFunc);
            reject(e);
        };
        instance.once('finish', finishFunc);
        instance.once('error', errorFunc);
        instance.end();
    });
};

fs.WriteStream.prototype.endPromise = endPromise;

module.exports = {
    endPromise: endPromise
};