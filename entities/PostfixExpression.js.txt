function PostfixExpression(operand, operator) {
    this.operand = operand;
    this.operator = operator;
}

PostfixExpression.prototype.toString = function () {
    return '(PostfixExpression ' + this.operand + ' ' + this.operator.lexeme + ')';
}

module.exports = PostfixExpression;