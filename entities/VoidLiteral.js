function VoidLiteral(token) {
    this.token = token;
}

VoidLiteral.prototype.toString = function () {
    return '(VoidLiteral ' + this.token.lexeme + ')';
}

module.exports = VoidLiteral;