function PrintStatement(expression) {
    this.expression = expression;
}

PrintStatement.prototype.toString = function () {
    return '(PrintStatement ' + this.expression + ')';
} 

PrintStatement.prototype.analyze = function (context) {
	this.expression.analyze(context);
}

module.exports = PrintStatement;