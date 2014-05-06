var error = require('../error');

function Attribute(name, property) {
    this.name = name;
    this.property = property;
}

Attribute.prototype.toString = function () {
    return '(Attribute ' + this.name + ' ' + this.property + ')';
} 

Attribute.prototype.analyze = function (context) {
    if (this.name === 'self') {
        if (!context.lookupContextType('ObjectDeclaration')) {
            error('A reference to "self" must be within the context of an "object" declaration.', this.token);
        }
        this.property.analyze(context.getContext('ObjectDeclaration'));
    } else {
        this.name.analyze(context);
        this.property.analyze(context);
    }
}

module.exports = Attribute;