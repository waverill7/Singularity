function Attribute(name, property) {
    this.name = name;
    this.property = property;
}

Attribute.prototype.toString = function () {
    return '(Attribute ' + this.name + ' ' + this.property + ')';
} 

module.exports = Attribute;