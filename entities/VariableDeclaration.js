function VariableDeclaration(scope, name, expression) {
    this.scope = scope;
    this.name = name;
    this.expression = expression;
}

VariableDeclaration.prototype.toString = function () {
    return '(VariableDeclaration ' + this.scope + ' ' + this.name.lexeme + ' ' + this.expression + ')';
} 

module.exports = VariableDeclaration;