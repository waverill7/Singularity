function AssignmentStatement(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
}

AssignmentStatement.prototype.toString = function () {
    return '(AssignmentStatement ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')'; 
} 

AssignmentStatement.prototype.analyze = function (context) {
    this.left.analyze(context);
    this.right.analyze(context);
}

module.exports = AssignmentStatement;