function Matrix(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

Matrix.prototype.toString = function () {
 return '(Matrix ' + this.name + ' ' + this.expressions.join(' ') + ')';
} 

Matrix.prototype.analyze = function (context) {
	this.name.analyze(context);
	this.expressions.forEach(function (expression) {
        expression.analyze(context);
	});
}

module.exports = Matrix;