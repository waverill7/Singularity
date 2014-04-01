function MatrixStatement(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

MatrixStatement.prototype.toString = function () {
    return '(MatrixStatement ' + this.name + ' ' + this.expressions.join(' ') + ')';
}

module.exports = MatrixStatement;