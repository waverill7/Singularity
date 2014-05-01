var error = require('../error');

function MethodDeclaration(scope, name, parameters, value, body) {
    this.scope = scope;
    this.name = name;
    this.parameters = parameters;
    this.value = value;
    this.body = body;
}

MethodDeclaration.prototype.toString = function () {
    return '(MethodDeclaration ' + this.scope + ' ' + this.name + ' ' + this.parameters.join(' ') + ' ' + this.value + ' ' + this.body + ')';
} 

MethodDeclaration.prototype.analyze = function (context) {
    if (!context.lookupContextType('ObjectDeclaration')) {
        error('A "method" declaration must be within the context of an "object" declaration.');
    }
    if (this.scope === 'global') {
        context.globalVariableMustNotBeAlreadyDeclared(this.name);
        context.addGlobalVariable(this.name.lexeme, this);
    } else {
        context.localVariableMustNotBeAlreadyDeclared(this.name);
        context.addLocalVariable(this.name.lexeme, this);
    }
    var methodContext = context.createChildContext();
    this.parameters.forEach(function (parameter) {
    	if (parameter !== 'self') {
            parameter.analyze(methodContext);
        }
    });
    if ((this.value !== 'void') && (this.value !== 'self')) {
    	this.value.analyze(methodContext);
    }
    this.body.analyze(methodContext, 'MethodDeclaration');
}

module.exports = MethodDeclaration;