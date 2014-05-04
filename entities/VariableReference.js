function VariableReference(token) {
    this.token = token;
}

VariableReference.prototype.toString = function () {
    return '(VariableReference ' + this.token.lexeme + ')';
} 

VariableReference.prototype.analyze = function (context) {
    this.referent = context.lookupVariable(this.token);
}

module.exports = VariableReference;