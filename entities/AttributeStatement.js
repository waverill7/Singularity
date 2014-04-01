function AttributeStatement(name, property) {
    this.name = name;
    this.property = property;
}

AttributeStatement.prototype.toString = function () {
    return '(AttributeStatement ' + this.name + ' ' + this.property + ')';
}

module.exports = AttributeStatement;