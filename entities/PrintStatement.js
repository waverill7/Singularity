function PrintStatement(expression) {
    this.expression = expression;
}

PrintStatement.prototype.toString = function () {
    return '(PrintStatement ' + this.expression + ')';
} 

module.exports = PrintStatement;