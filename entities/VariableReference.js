function VariableReference(token) {
    this.token = token;
}

VariableReference.prototype.toString = function () {
    return '(VariableReference ' + this.token.lexeme + ')';
}

module.exports = VariableReference;