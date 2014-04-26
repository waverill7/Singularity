var Type = require('./Type');

function IntegerLiteral(token) {
    this.token = token;
}

IntegerLiteral.prototype.toString = function () {
    return '(IntegerLiteral ' + this.token.lexeme + ')';
} 

IntegerLiteral.prototype.analyze = function (context) {
	this.type = Type.INTEGER;
}

module.exports = IntegerLiteral;