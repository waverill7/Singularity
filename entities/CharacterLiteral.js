var Type = require('./Type');

function CharacterLiteral(token) {
    this.token = token;
}

CharacterLiteral.prototype.toString = function () {
    return '(CharacterLiteral ' + this.token.lexeme + ')';
} 

CharacterLiteral.prototype.analyze = function (context) {
	this.type = Type.CHARACTER;
}

module.exports = CharacterLiteral;