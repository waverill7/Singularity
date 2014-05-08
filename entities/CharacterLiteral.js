function CharacterLiteral(token) {
    this.token = token;
}

CharacterLiteral.prototype.toString = function () {
    return this.token.lexeme;
} 

CharacterLiteral.prototype.analyze = function (context) {
}

module.exports = CharacterLiteral;
