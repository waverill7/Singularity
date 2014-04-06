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

module.exports = MethodDeclaration;