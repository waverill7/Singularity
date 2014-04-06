function ForStatement(initialization, condition, update, body) {
    this.initialization = initialization;
    this.condition = condition;
    this.update = update;
    this.body = body;
}

ForStatement.prototype.toString = function () {
    return '(ForStatement ' + this.initialization + ' ' + this.condition + ' ' + this.update + ' ' + this.body + ')';
} 

module.exports = ForStatement;