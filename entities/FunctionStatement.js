function FunctionStatement(scope, name, parameters, value, body) {
    this.scope = scope;
    this.name = name;
    this.parameters = parameters;
    this.value = value;
    this.body = body;
}

FunctionStatement.prototype.toString = function () {
    return '(FunctionStatement ' + this.scope + ' ' + this.name + ' ' + this.parameters.join(' ') + ' ' + this.value + ' ' + this.body + ')';
}

module.exports = FunctionStatement;