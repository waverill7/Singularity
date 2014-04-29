function WhileStatement(condition, body) {
    this.condition = condition;
    this.body = body;
}

WhileStatement.prototype.toString = function () {
    return '(WhileStatement ' + this.condition + ' ' + this.body + ')';
} 

WhileStatement.prototype.analyze = function (context) {
	this.condition.analyze(context);
	this.body.analyze(context, 'WhileStatement');
}

module.exports = WhileStatement;