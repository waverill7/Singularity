function AssignmentStatement(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
}

AssignmentStatement.prototype.toString = function () {
    return '(AssignmentStatement ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')'; 
} 

module.exports = AssignmentStatement;