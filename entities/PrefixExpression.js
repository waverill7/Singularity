function PrefixExpression(operator, operand) {
    this.operator = operator;
    this.operand = operand;
}

PrefixExpression.prototype.toString = function () {
    return '(PrefixExpression ' + this.operator.lexeme + ' ' + this.operand + ')';
} 

module.exports = PrefixExpression;