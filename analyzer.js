var error = require('./error');

function AnalysisContext(parent) {
    this.parent = parent;
    this.symbolTable = {};
    this.contextType = '';
}

AnalysisContext.initialContext = function () {
    return new AnalysisContext(null);
}

AnalysisContext.prototype.createChildContext = function () {
    return new AnalysisContext(this);
}

AnalysisContext.prototype.variableMustNotBeAlreadyDeclared = function (token) {
    if (this.symbolTable[token.lexeme]) {
        error('Variable ' + token.lexeme + ' already declared', token);
    }
}

AnalysisContext.prototype.addGlobalVariable = function (name, entity) {
    if (!this.parent) {
        this.symbolTable[name] = entity;
    } else {
        return this.parent.addGlobalVariable(name, entity);
    }
}

AnalysisContext.prototype.addLocalVariable = function (name, entity) {
    this.symbolTable[name] = entity;
}

AnalysisContext.prototype.lookupVariable = function (token) {
    var variable = this.symbolTable[token.lexeme];
    if (variable) {
        return variable;
    } else if (!this.parent) {
        error('Variable ' + token.lexeme + ' not found', token);
    } else {
        return this.parent.lookupVariable(token);
    }
}

AnalysisContext.prototype.addContextType = function (contextType) {
    this.contextType = contextType;
}

AnalysisContext.prototype.lookupContextType = function (contextType) {
    if (this.contextType === contextType) {
        return true;    
    } else if (!this.parent) {
        return false;
    } else {
        return this.parent.lookupContextType(contextType);
    }
}

exports.initialContext = AnalysisContext.initialContext;
