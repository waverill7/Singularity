function BooleanLiteral(token) {
    this.token = token;
}

BooleanLiteral.prototype.toString = function () {
    return '(BooleanLiteral ' + this.token.lexeme + ')';
} 

module.exports = BooleanLiteral;