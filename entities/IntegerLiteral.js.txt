function IntegerLiteral(token) {
    this.token = token;
}

IntegerLiteral.prototype.toString = function () {
    return '(IntegerLiteral ' + this.token.lexeme + ')';
}

module.exports = IntegerLiteral;