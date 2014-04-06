function InfixExpression(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
}

InfixExpression.prototype.toString = function () {
    return '(InfixExpression ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')';
} 

module.exports = InfixExpression;