var Type = require('./Type');

function RealLiteral(token) {
    this.token = token;
}

RealLiteral.prototype.toString = function () {
    return '(RealLiteral ' + this.token.lexeme + ')';
} 

RealLiteral.prototype.analyze = function (context) {
}

module.exports = RealLiteral;