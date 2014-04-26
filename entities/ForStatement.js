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
	this.initialization.type.mustBeInteger('Initialization in "for" statement must be integer.');
	this.condition.analyze(context);
	this.condition.type.mustBeBoolean('Condition in "for" statement must be boolean.');
	this.update.analyze(context);
	this.update.type.mustBeInteger('Update in "for" statement must be integer.');
	this.body.analyze(context, 'ForStatement');
}

module.exports = ForStatement;