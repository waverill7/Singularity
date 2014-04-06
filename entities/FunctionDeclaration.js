function FunctionDeclaration(scope, name, parameters, value, body) {
    this.scope = scope;
    this.name = name;
    this.parameters = parameters;
    this.value = value;
    this.body = body;
}

FunctionDeclaration.prototype.toString = function () {
    return '(FunctionDeclaration ' + this.scope + ' ' + this.name + ' ' + this.parameters.join(' ') + ' ' + this.value + ' ' + this.body + ')';
} 

module.exports = FunctionDeclaration;