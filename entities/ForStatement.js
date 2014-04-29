function ForStatement(initialization, condition, update, body) {
    this.initialization = initialization;
    this.condition = condition;
    this.update = update;
    this.body = body;
}

ForStatement.prototype.toString = function () {
    return '(ForStatement ' + this.initialization + ' ' + this.condition + ' ' + this.update + ' ' + this.body + ')';
} 

ForStatement.prototype.analyze = function (context) {
	this.initialization.analyze(context);
	this.condition.analyze(context);
	this.update.analyze(context);
	this.body.analyze(context, 'ForStatement');
}

module.exports = ForStatement;