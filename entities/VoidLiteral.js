var Type = require('./Type');

function VoidLiteral(token) {
    this.token = token;
}

VoidLiteral.prototype.toString = function () {
    return '(VoidLiteral ' + this.token.lexeme + ')';
} 

VoidLiteral.prototype.analyze = function (context) {
	this.type = Type.VOID;
}

module.exports = VoidLiteral;