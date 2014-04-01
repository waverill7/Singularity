function InfixExpression(operator, left, right) {
    this.operator = operator;
    this.left = left;
    this.right = right;
}

InfixExpression.prototype.toString = function () {
    return '(InfixExpression ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')';
}

module.exports = InfixExpression;