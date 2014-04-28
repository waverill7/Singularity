var Type = require('./Type');

function PrefixExpression(operator, operand) {
    this.operator = operator;
    this.operand = operand;
}

PrefixExpression.prototype.toString = function () {
    return '(PrefixExpression ' + this.operator.lexeme + ' ' + this.operand + ')';
} 

PrefixExpression.prototype.analyze = function (context) {
	this.operand.analyze(context);
	if (this.op.lexeme === 'not') {
		this.operand.type.mustBeBoolean('The "not" operator requires a boolean operand.', this.op);
		this.type = Type.BOOLEAN;
	} else if (this.op.lexeme === '~') {
        this.operand.type.mustBeInteger('The "~" operator requires an integer operand.', this.op);
        this.type = Type.INTEGER;
	} else {
		this.operand.type.mustBeNumber('The "' + this.op.lexeme + '" operator requires a numberic operand.', this.op);
		if (this.operand.type.isInteger()) {
            this.type = Type.INTEGER;
		} else if (this.operand.type.isReal()) {
			this.type = Type.REAL;
		}
	}
}

module.exports = PrefixExpression;