function Attribute(name, property) {
    this.name = name;
    this.property = property;
}

Attribute.prototype.toString = function () {
    return '(Attribute ' + this.name + ' ' + this.property + ')';
} 

Attribute.prototype.analyze = function (context) {
	this.name.analyze(context);
	this.property.analyze(context);
}

module.exports = Attribute;