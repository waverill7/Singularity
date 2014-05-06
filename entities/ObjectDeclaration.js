function ObjectDeclaration(scope, name, inheritance, body) {
    this.scope = scope;
    this.name =  name;
    this.inheritance = inheritance;
    this.body = body;
}

ObjectDeclaration.prototype.toString = function () {
    return '(ObjectDeclaration ' + this.scope + ' ' + this.name.lexeme + ' ' + this.inheritance.join(' ') + ' ' + this.body + ')';
} 

ObjectDeclaration.prototype.analyze = function (context) {
    if (this.scope === 'global') {
        context.globalVariableMustNotBeAlreadyDeclared(this.name);
        context.addGlobalVariable(this.name.lexeme, this);
    } else {
        context.localVariableMustNotBeAlreadyDeclared(this.name);
        context.addLocalVariable(this.name.lexeme, this);
    }
    var objectContext = context.createChildContext();
        this.inheritance.forEach(function (object) {
            object.analyze(objectContext);
        });
    }
    this.body.analyze(objectContext, 'ObjectDeclaration');
}

module.exports = ObjectDeclaration;