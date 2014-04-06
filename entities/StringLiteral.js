function StringLiteral(token) {
    this.token = token;
}

StringLiteral.prototype.toString = function () {
    return '(StringLiteral ' + this.token.lexeme + ')';
} 

module.exports = StringLiteral;