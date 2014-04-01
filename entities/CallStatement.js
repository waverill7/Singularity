function CallStatement(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

CallStatement.prototype.toString = function () {
    return '(CallStatement ' + this.name + ' ' + this.expressions.join(' ') + ')';
}

module.exports = CallStatement;