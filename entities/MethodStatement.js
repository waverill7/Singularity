function MethodStatement(scope, name, parameters, value, body) {
    this.scope = scope;
    this.name = name;
    this.parameters = parameters;
    this.value = value;
    this.body = body;
}

MethodStatement.prototype.toString = function () {
    return '(MethodStatement ' + this.scope + ' ' + this.name + ' ' + this.parameters.join(' ') + ' ' + this.value + ' ' + this.body + ')';
}

module.exports = MethodStatement;