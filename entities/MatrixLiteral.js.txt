function MatrixLiteral(expressions) {
    this.expressions = expressions;
}

MatrixLiteral.prototype.toString = function () {
    return '(MatrixLiteral ' + this.expressions.join(' ') + ')';
}

module.exports = MatrixLiteral;