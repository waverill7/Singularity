function IntegerLiteral(token) {
    this.token = token;
}

IntegerLiteral.prototype.toString = function () {
    return this.token.lexeme;
} 

IntegerLiteral.prototype.analyze = function (context) {
}

module.exports = IntegerLiteral;
