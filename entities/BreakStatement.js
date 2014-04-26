var error = require('../error');

function BreakStatement(token) {
	this.token = token;
}

BreakStatement.prototype.toString = function () {
    return '(BreakStatement)';
} 

BreakStatement.prototype.analyze = function (context) {
    if (!context.lookupContextType('ForStatement')) {
    	error('A "break" statement must be within the context of a "for" statement.', this.token);
    }
}

module.exports = BreakStatement;