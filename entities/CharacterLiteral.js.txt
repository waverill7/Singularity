function CharacterLiteral(token) {
    this.token = token;
}

CharacterLiteral.prototype.toString = function () {
    return '(CharacterLiteral ' + this.token.lexeme + ')';
}

module.exports = CharacterLiteral;