function WhileStatement(condition, body) {
    this.condition = condition;
    this.body = body;
}

WhileStatement.prototype.toString = function () {
    return '(WhileStatement ' + this.condition + ' ' + this.body + ')';
} 

module.exports = WhileStatement;