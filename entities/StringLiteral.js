var Type = require('./Type');

function StringLiteral(token) {
    this.token = token;
}

StringLiteral.prototype.toString = function () {
    return '(StringLiteral ' + this.token.lexeme + ')';
} 

StringLiteral.prototype.analyze = function (context) {
}

module.exports = StringLiteral;