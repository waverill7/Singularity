function InfixExpression(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
}

InfixExpression.prototype.toString = function () {
    return '(InfixExpression ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')';
} 

InfixExpression.prototype.analyze = function (context) {
	this.left.analyze(context);
	this.right.analyze(context);
}

module.exports = InfixExpression;