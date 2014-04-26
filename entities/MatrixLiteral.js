function MatrixLiteral(expressions) {
    this.expressions = expressions;
}

MatrixLiteral.prototype.toString = function () {
    return '(MatrixLiteral ' + this.expressions.join(' ') + ')';
} 

MatrixLiteral.prototype.analyze = function (context) {
	this.expressions.forEach(function (expression) {
		expression.analyze(context);
	});
}

module.exports = MatrixLiteral;