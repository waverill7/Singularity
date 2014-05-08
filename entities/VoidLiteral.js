function VoidLiteral(token) {
    this.token = token;
}

VoidLiteral.prototype.toString = function () {
    return this.token.lexeme;
} 

VoidLiteral.prototype.analyze = function (context) {
}

module.exports = VoidLiteral;
