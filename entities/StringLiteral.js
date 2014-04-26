var Type = require('./Type');

function StringLiteral(token) {
    this.token = token;
}

StringLiteral.prototype.toString = function () {
    return '(StringLiteral ' + this.token.lexeme + ')';
} 

StringLiteral.prototype.analyze = function (context) {
	this.type = Type.STRING;
}

module.exports = StringLiteral;