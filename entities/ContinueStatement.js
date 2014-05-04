var error = require('../error');

function ContinueStatement(token) {
    this.token = token;
}

ContinueStatement.prototype.toString = function () {
    return '(ContinueStatement)';
} 

ContinueStatement.prototype.analyze = function (context) {
    if (!context.lookupContextType('ForStatement')) {
        error('A "continue" statement must be within the context of a "for" statement.', this.token);
    }
}

module.exports = ContinueStatement;