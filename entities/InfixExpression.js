var Type = require('./Type');
var error = require('../error');

function InfixExpression(left, operator, right) {
    this.left = left;
    this.operator = operator;
    this.right = right;
}

InfixExpression.prototype.toString = function () {
    return '(InfixExpression ' + this.left + ' ' + this.operator.lexeme + ' ' + this.right + ')';
} 

InfixExpression.prototype.analyze = function (context) {
    this.left.analyze(context);
    this.right.analyze(context);
    operator = this.operator.lexeme;
    if (/or|and/.test(operator)) {
        this.bothOperandsMustBe(Type.BOOLEAN);
        this.type = Type.BOOLEAN;
    } else if (/\||^|&/.test(operator)) {
        this.bothOperandsMustBe(Type.INTEGER);
        this.type = Type.INTEGER;
    } else if (/==|!=/.test(operator)) {
        this.left.type.mustBeCompatibleWith(this.right.type, 'Operands of "' + operator + '" must have same type.', this.operator);
        this.type = Type.BOOLEAN;
    } else if (/<=?|>=?/.test(operator)) {
        if (this.left.type.isInteger()) {
            this.bothOperandsMustBe(Type.INTEGER);
        } else {
            this.bothOperandsMustBe(Type.REAL);
        }
        this.type = Type.BOOLEAN;
    } else if (/<<|>>/.test(operator)) {
        this.bothOperandsMustBe(Type.INTEGER);
        this.type = Type.INTEGER;
    } else if (/\+/.test(operator) && (this.left.type.isString() || this.right.type.isString())) {
        this.type = Type.STRING;
    } else {
        if (this.left.type.isInteger() && this.right.type.isInteger()) {
            this.type = Type.INTEGER;
        } else if (this.left.type.isNumber() && this.right.type.isNumber()) {
            this.type = Type.REAL;
        } else {
            error('Operands to "' + this.operator.lexeme + '" must both be numbers.', this.operator);
        }
    }
}

InfixExpression.prototype.bothOperandsMustBe = function (type) {
    if ((type !== this.left.type) || (type !== this.right.type)) {
        error('Operands to "' + this.operator.lexeme + '" must both have type ' + type + '.', this.operator);
    }
}

module.exports = InfixExpression;