function Call(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

Call.prototype.toString = function () {
    return '(Call ' + this.name + ' ' + this.expressions.join(' ') + ')';
} 

Call.prototype.analyze = function (context) {
	this.name.analyze(context);
	this.expressions.forEach(function (expression) {
		expression.analyze(context);
	});
}

module.exports = Call;