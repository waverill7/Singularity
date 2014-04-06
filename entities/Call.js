function Call(name, expressions) {
    this.name = name;
    this.expressions = expressions;
}

Call.prototype.toString = function () {
    return '(Call ' + this.name + ' ' + this.expressions.join(' ') + ')';
} 

module.exports = Call;