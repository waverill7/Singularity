var Type = require('./Type');

function BooleanLiteral(token) {
    this.token = token;
}

BooleanLiteral.prototype.toString = function () {
    return '(BooleanLiteral ' + this.token.lexeme + ')';
} 

BooleanLiteral.prototype.analyze = function (context) {
	this.type = Type.BOOLEAN;
}

module.exports = BooleanLiteral;