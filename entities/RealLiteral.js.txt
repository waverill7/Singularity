function RealLiteral(token) {
    this.token = token;
}

RealLiteral.prototype.toString = function () {
    return '(RealLiteral ' + this.token.lexeme + ')';
}

module.exports = RealLiteral;