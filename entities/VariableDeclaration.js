function VariableDeclaration(scope, name, expression) {
    this.scope = scope;
    this.name = name;
    this.expression = expression;
}

VariableDeclaration.prototype.toString = function () {
    return '(VariableDeclaration ' + this.scope + ' ' + this.name.lexeme + ' ' + this.expression + ')';
} 

VariableDeclaration.prototype.analyze = function (context) {
	if (this.scope === 'global') {
        context.globalVariableMustNotBeAlreadyDeclared(this.name);
        context.addGlobalVariable(this.name.lexeme, this);
	} else {
        context.localVariableMustNotBeAlreadyDeclared(this.name);
        context.addLocalVariable(this.name.lexeme, this);
	}
	this.expression.analyze(context);
}

module.exports = VariableDeclaration;