function Matrix(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

Matrix.prototype.toString = function () {
 return '(Matrix ' + this.name + ' ' + this.expressions.join(' ') + ')';
} 

module.exports = Matrix;