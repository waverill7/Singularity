var util = require('util');
var HashMap = require('hashmap').HashMap;

module.exports = function (program) {
    gen(program);
}

var indentPadding = 4;
var indentLevel = 0;

function emit(line) {
    var pad = indentPadding * indentLevel;
    console.log(Array(pad+1).join('') + line);
}

function makeOp(op) {
    return {not: '!', and: '&&', or: '||'}[op] || op;
}

var makeVariable = (function () {
    var lastId = 0;
    var map = new HashMap();
    return function (v) {
        if (!map.has(v)) {
            map.set(v, ++lastId);
        }
        return '_v' + map.get(v);
    }
}());

function gen(e) {
    return generator[e.constructor.name](e);
}

var generator = {

    'AssignmentStatement': function (s) {
        emit(util.format('%s %s %s;', gen(s.left), makeOp(s.operator.lexeme), gen(s.right)));
    },

    'Block': function (block) {
        indentLevel++;
        block.statements.forEach(function (statement) {
            gen(statement);
        });
        indentLevel--;
    },

    'BooleanLiteral': function (literal) {
        return literal.toString();
    },

    'BreakStatement': function(s) {
        return 'break';
    },

    'CharacterLiteral': function (literal) {
        return literal.toString();
    },

    'ContinueStatement': function (s) {
        return 'continue';
    },

    'ForStatement': function (s) {
        emit('for (' + gen(s.initialization) + '; ' + gen(s.condition) + '; ' + gen(s.update) + ') {');
        gen(s.body);
        emit('}');
    },

    'InfixExpression': function (e) {
        return util.format('(%s %s %s)', gen(e.left), makeOp(e.operator.lexeme), gen(e.right));
    },

    'IntegerLiteral': function (literal) {
        return literal.toString();
    },

    'PrefixExpression': function (e) {
        return util.format('(%s %s)', makeOp(e.operator.lexeme), gen(e.operand));
    },

    'Program': function (program) {
        indentLevel = 0;
        emit('(function () {');
        gen(program.block);
        emit('}());');
    },

    'RealLiteral': function (literal) {
        return literal.toString();
    },

    'StringLiteral': function (literal) {
        return literal.toString();
    },

    'VariableDeclaration': function (v) {
        emit(util.format('var %s = %s;', makeVariable(v), gen(v.expression)));
    },

    'VariableReference': function (v) {
        return makeVariable(v.referent);
    }, 

    'VoidLiteral': function (literal) {
        return 'null';
    },

    'WhileStatement': function (s) {
        emit('while (' + gen(s.condition) + ') {');
        gen(s.body);
        emit('}');
    }
}