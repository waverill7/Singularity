var error = require('../error');

var cache = {};

function Type(name) {
	this.name = name;
	cache[name] = this;
}

Type.prototype.toString = function () {
	return this.name;
}

exports.BOOLEAN = Type.BOOLEAN = new Type('boolean');
exports.INTEGER = Type.INTEGER = new Type('integer');
exports.REAL = Type.REAL = new Type('real');
exports.CHARACTER = Type.CHARACTER = new Type('character');
exports.STRING = Type.STRING = new Type('string');
exports.VOID = Type.VOID = new Type('void');

Type.prototype.mustBeBoolean = function(message, location) {
	if (this !== Type.BOOLEAN) {
		error(message, location);
	}
}

Type.prototype.mustBeInteger = function (message, location) {
	if (this !== Type.INTEGER) {
		error(message, location);
	}
}

Type.prototype.mustBeNumber = function (message, location) {
	if ((this !== Type.INTEGER) || (this !== Type.REAL)) {
		error(message, location);
	}
}

Type.prototype.isInteger = function () {
	return this === Type.INTEGER;
}

Type.prototype.isReal = function () {
	return this === Type.REAL;
}

Type.prototype.isCompatibleWith = function (otherType) {
	return this == otherType;
}

Type.prototype.mustBeCompatibleWith = function (otherType, message, location) {
	if (!this.isCompatibleWith(otherType)) {
		error(message, location);
	}
}