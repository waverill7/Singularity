function ObjectDeclaration(scope, name, inheritance, body) {
    this.scope = scope;
    this.name =  name;
    this.inheritance = inheritance;
    this.body = body;
}

ObjectDeclaration.prototype.toString = function () {
    return '(ObjectDeclaration ' + this.scope + ' ' + this.name.lexeme + ' ' + this.inheritance.join(' ') + ' ' + this.body + ')';
} 

module.exports = ObjectDeclaration;