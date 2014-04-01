function ObjectStatement(name, inheritance, body) {
    this.name = name;
    this.inheritance = inheritance;
    this.body = body;
}

ObjectStatement.prototype.toString = function () {
    return '(ObjectStatement ' + this.name + ' ' + this.inheritance.join(' ') + ' ' + this.body + ')';
}

module.exports = ObjectStatement;