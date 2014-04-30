function FunctionDeclaration(scope, name, parameters, value, body) {
    this.scope = scope;
    this.name = name;
    this.parameters = parameters;
    this.value = value;
    this.body = body;
}

FunctionDeclaration.prototype.toString = function () {
    return '(FunctionDeclaration ' + this.scope + ' ' + this.name.lexeme + ' ' + this.parameters.join(' ') + ' ' + this.value + ' ' + this.body + ')';
}

FunctionDeclaration.prototype.analyze = function (context) {
    if (this.scope === 'global') {
        context.globalVariableMustNotBeAlreadyDeclared(this.name);
        context.addGlobalVariable(this.name.lexeme, this);
    } else {
        context.localVariableMustNotBeAlreadyDeclared(this.name);
        context.addLocalVariable(this.name.lexeme, this);
    }
    var functionContext = context.createChildContext();
    if (this.parameters[0] !== 'void') {
        this.parameters.forEach(function (parameter) {
            parameter.analyze(functionContext);
        });
    }
    if (this.value !== 'void') {
        this.value.analyze(functionContext);
    }
    this.body.analyze(functionContext, 'FunctionDeclaration');
}

module.exports = FunctionDeclaration;