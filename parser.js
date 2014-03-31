/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner');
var error = require('./error');

var Program = require('./entities/program');
var Block = require('./entities/block');
var DeclarationStatement = require('./entities/declaration');
var FunctionStatement = require('./entities/function');
var MethodStatement = require('./entities/method');
var AssignmentStatement = require('./entities/assignment');
var AttributeStatement = require('./entities/attribute');
var CallStatement = require('./entities/call');
var MatrixStatement = require('./entities/matrix');
var PrintStatement = require('./entiteis/print');
var WhileStatement = require('./entities/while');
var ForStatement = require('./entities/for');
var BreakStatement = require('./entities/break');
var ContinueStatement = require('./entities/continue');
var ConditionStatement = require('./entities/if');
var ObjectStatement = require('./entities/object');
var VoidLiteral = require('./entities/voidLiteral');
var BooleanLiteral = require('./entities/booleanLiteral');
var IntegerLiteral = require('./entities/integerLiteral');
var RealLiteral = require('./entities/realLiteral');
var CharacterLiteral = require('./entities/characterLiteral');
var StringLiteral = require('./entities/stringLiteral');
var VariableReference = require('./entities/variablereRerence');
var UnaryExpression = require('./entities/unaryExpression');
var BinaryExpression = require('./entities/binaryExpression');

var tokens;

module.exports = function (scannerOutput) {
  tokens = scannerOutput;
  var program = parseProgram();
  match('EOF');
  return program;
}

function parseProgram() {
    return new Program(parseBlock());
}

function parseBlock() {
    var statements = [];
    do {
        if (at('Return')) {
            match();
        } else {
            statements.push(parseStatement());
        }
    } while (at(['Return', 'global', 'local', '@', 'self', 'ID', 'print', 'while', 'for', 'break', 'continue', 'if', 'object']));
    return new Block(statements);
}

function parseStatement() {
    if (at(['global', 'local'])) {
        return parseScope();
    } else if (at('@')) {
        return parseAssignmentStatement();
    } else if (at('self')) {
        return parseAttributeStatement();
    } else if (at('ID')) {
        var name = new VariableReference(match());
        if (at('.')) {
            return parseAttributeStatement(name);
        } else if (at('(')) {
            return parseCallStatement(name);
        } else {
            return parseMatrixStatement(name);
        }
    } else if (at('print')) {
        return parsePrintStatement();
    } else if (at('while')) {
        return parseWhileStatement();
    } else if (at('for')) {
        return parseForStatement();
    } else if (at('break')) {
        return parseBreakStatement();
    } else if (at('continue')) {
        return parseContinueStatement();
    } else if (at('if')) {
        return parseConditionStatement();
    } else if (at('object')) {
        return parseObjectStatement();
    } else {
        error('Statement expected', tokens[0]);
    }
}

function parseScope() {
    var scope;
    var name;
    if (at('global')) {
        scope = match();
    } else {
        scope = match('local');
    }
    name = new VariableReference(match('ID'));
    if (at('=')) {
        return parseDeclarationStatement(scope, name);
    } else {
        return parseSignature(scope, name);
    }
}

function parseDeclarationStatement(scope, name) {
    var declarations = [];
    declarations.push(name);
    match('=');
    declarations.push(parseExpression());
    if (at('{')) {
        declarations.push(parseSize());
    } else if (at('#')) {
        match();
        declarations.push(parseExpression());
    }
    while (at(',')) {
        match();
        declarations.push(new VariableReference(match('ID')));
        match('=');
        declarations.push(parseExpression());
        if (at('{')) {
            declarations.push(parseSize());
        } else if (at('#')) {
            match();
            declarations.push(parseExpression());
        }
    }
    return new DeclarationStatement(scope, declarations);
}

function parseSize() {
    var size;
    match('{');
    if (at(['u_byte', 'u_short', 'u_int', 'u_long', 'byte', 'short', 'int', 'long', 'float', 'double'])) {
        size = match();
    }
    match('}');
    return size;
}

function parseSignature(scope, name) {
    match('(');
    if (at(['ID', 'void'])) {
        return parseFunctionStatement(scope, name);
    } else {
        return parseMethodStatement(scope, name);
    }
}

function parseFunctionStatement(scope, name) {
    var parameters = [];
    var returnVariable;
    var body;
    if (at('void')) {
        match();
        parameters.push(new VoidLiteral());
    } else {
        parameters.push(new VariableReference(match('ID')));
        while (at(',')) {
            match(',');
            parameters.push(new VariableReference(match('ID')));
        }
    }
    match(')');
    match('=');
    if (at('ID')) {
        returnVariable = new VariableReference(match());
    } else {
        match('void');
        returnVariable = new VoidLiteral();
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new FunctionStatement(scope, name, parameters, returnVariable, body);
}

function parseMethodStatement(scope, name) {
    var parameters = [];
    var returnVariable;
    var body;
    parameters.push(match('self'));
    while (at(',')) {
        match(',');
        parameters.push(new VariableReference(match('ID')));
    }
    match(')');
    match('=');
    if (at('ID')) {
        returnVariable = new VariableReference(match());
    } else if (at('void')) {
        match();
        returnVariable = new VoidLiteral();
    } else {
        returnVariable = match('self');
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return MethodStatement(scope, name, parameters, returnVariable, body);
}

function parseAssignmentStatement() {
    var name;
    var type;
    var expressions = [];
    var row = [];
    match('@');
    if (at('ID')) {
        name = new VariableReference(match());
        if (at(['=', '++', '--'])) {
            if (at('=')) {
                match();
                type = 'generic';
                expressions.push(parseExpression());
            } else if (at('++')) {
                match();
                type = 'increment';
            } else {
                match('--');
                type = 'decrement';
            }
        } else {
            match('[');
            if (at(']')) {
                match();
                type = 'matrix_0';
                match('=');
                match('[');
                match('[');
                row.push(parseExpresssion());
                while (at(',')) {
                    match();
                    row.push(parseExpression());
                }
                match(']');
                expressions.push(row);
                row = [];
                while (at('[')) {
                    row.push(parseExpresssion());
                    while (at(',')) {
                        match();
                        row.push(parseExpression());
                    }
                    match(']');
                    expressions.push(row);
                    row = [];
                }
                match(']');
            } else {
                type = 'matrix_1';
                expressions.push(parseExpression());
                match(']');
                if (at('=')) {
                    match();
                    match('[');
                    row.push(parseExpression());
                    while (at(',')) {
                        match();
                        row.push(parseExpression());
                    }
                    match(']');
                    expressions.push(row);
                    row = [];
                } else {
                    type = 'matrix_2';
                    match('[');
                    expressions.push(parseExpression());
                    match(']');
                    match('=');
                    expressions.push(parseExpression());
                }
            }
        }
    } else {
        name = match('self');
        match('.');
        expressions.push(new VariableReference(match('ID')));
        if (at('=')) {
            match();
            type = 'generic';
            expressions.push(parseExpression());
        } else if (at('++')) {
            match();
            type = 'increment';
        } else {
            match('--');
            type = 'decrement';
        }
    }
    return new AssignmentStatement(name, type, expressions);
}

function parseAttributeStatement(name) {
    var property;
    var calls = [];
    if (at('self')) {
        name = match();
        match('.');
        if (at('ID')) {
            property = new VariableReference(match());
        } else {
            calls.push(parseCallStatement());
        }
    } else {
        match('.');
        calls.push(parseCallStatement());
        while (at('.')) {
            match('.');
            calls.push(parseCallStatement());
        }
    }
    return new AttributeStatement(name, property, calls);    
}

function parseCallStatement(name) {
    return new CallStatement(name, parseArguments());
}

function parseArguments() {
    var expressions = [];
    match('(');
    if (at(')')) {
        match(')');
    } else {
        expressions.push(parseExpression());
        while (at(',')) {
            match(',');
            expressions.push(parseExpression());
        }
        match(')');
    }
    return expressions;
}

function parseMatrixStatement(name) {
    var expressions = [];
    match('[');
    if (at(']')) {
        match(']');
    } else {
        expressions.push(parseExpression());
        match(']');
        if (at('[')) {
            match('[');
            expressions.push(parseExpression());
            match(']');
        }
    }
    return new MatrixStatement(name, expressions);
}

function parsePrintStatement() {
    var expression;
    match('print');
    expression = parseExpression();
    return new PrintStatement(expression);
}

function parseWhileStatement() {
    var condition;
    var body;
    match('while');
    condition = parseExpression();
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new WhileStatement(condition, body);
}

function parseForStatement() {
    var initialization;
    var condition;
    var afterThought;
    var body;
    match('for');
    initialization = parseAssignmentStatement();
    match(',');
    condition = parseExpression();
    match(',');
    afterThought = parseAssignmentStatement();
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new ForStatement(initialization, condition, afterThought, body);
}

function parseBreakStatement() {
    match('break');
    return new BreakStatement();
}

function parseContinueStatement() {
    match('continue');
    return new ContinueStatement();
}

function parseConditionStatement() {
    var IF = [];
    var ELIF = [];
    var ELSE = [];
    match('if');
    IF.push(parseExpression());
    match(':');
    match('Return');
    match('Indent');
    IF.push(parseBlock());
    match('Dedent');
    while (at('elif')) {
        match();
        ELIF.push(parseExpression());
        match(':');
        match('Return');
        match('Indent');
        ELIF.push(parseBlock());
        match('Dedent');
    }
    if (at('else')) {
        match();
        match(':');
        match('Return');
        match('Indent');
        ELSE.push(parseBlock());
        match('Dedent');
    }
    return new ConditionStatement(IF, ELIF, ELSE);
}

function parseObjectStatement() {
    var name;
    var inheritance = [];
    var body;
    match('object');
    name = new VariableReference(match('ID'));
    if (at('(')) {
        match('(');
        inheritiance.push(new VariableReference(match('ID')));
        while (at(',')) {
            match(',');
            inheritance.push(new VariableReference(match('ID')));
        }
        match(')');
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new ObjectStatement(name, inheritance, body);
}

function parseExpression() {
    var operator;
    var left;
    var right;
    left = parseExpression_1();
    while (at('or')) {
        operator = match();
        right = parseExpression_1();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_1() {
    var operator;
    var left;
    var right;
    left = parseExpression_2();
    while (at('and')) {
        operator = match();
        right = parseExpression_2();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_2() {
    var operator;
    var operand;
    if (at('not')) {
        operator = match();
        operand = parseExpression_3();
        return new UnaryExpression(operator, operand);
    } else {
        return parseExpression_3();
    }
}

function parseExpression_3() {
    var operator;
    var left;
    var right;
    left = parseExpression_4();
    if (at(['<', '<=', '>', '>=', '!=', '=='])) {
        operator = match();
        right = parseExpression_4();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_4() {
    var operator;
    var left;
    var right;
    left = parseExpression_5();
    while (at('|')) {
        operator = match();
        right = parseExpression_5();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_5() {
    var operator;
    var left;
    var right;
    left = parseExpression_6();
    while (at('^')) {
        operator = match();
        right = parseExpression_6();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_6() {
    var operator;
    var left;
    var right;
    left = parseExpression_7();
    while (at('&')) {
        operator = match();
        right = parseExpression_7();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_7() {
    var operator;
    var left;
    var right;
    left = parseExpression_8();
    while (at(['>>', '<<'])) {
        operator = match();
        right = parseExpression_8();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_8() {
    var operator;
    var left;
    var right;
    left = parseExpression_9();
    while (at(['-', '+'])) {
        operator = match();
        right = parseExpression_9();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_9() {
    var operator;
    var left;
    var right;
    left = parseExpression_10();
    while (at(['%', '/', '*'])) {
        operator = match();
        right = parseExpression_10();
        left = new BinaryExpression(operator, left, right);
    }
    return left;
}

function parseExpression_10() {
    var operator;
    var operand;
    if (at('-')) {
        operator = match();
        operand = parseExpression_11();
        return new UnaryExpression(operator, operand);
    } else {
        return parseExpression_11();
    }
}

function parseExpression_11() {
    var operator;
    var operand;
    if (at('~')) {
        operator = match();
        operand = parseExpression_12();
        return new UnaryExpression(operator, operand);
    } else {
        return parseExpression_12();
    }
}

function parseExpression_12() {
  var operator;
  var left;
  var right;
  left = parseExpression_13();
  while (at('**')) {
    operator = match();
    right = parseExpression_13();
    left = new BinaryExpression(operator, left, right);
  }
  return left;
}

function parseExpression_13() {
    if (at(['void','true','false','IntegerLiteral','RealLiteral','CharacterLiteral','StringLiteral'])) {
        return parseLiteral();
    } else if (at('self')) {
        return parseAttributeStatement();
    } else if (at('ID')) {
        var name = new VariableReference(match());
        if (at('.')) {
            return parseAttributeStatement(name);
        } else if (at('(')) {
            return parseCallStatement(name);
        } else if (at('[')) {
            return parseMatrixStatement(name);
        } else {
            return new VariableReference(match('ID'));
        }
    } else if (at('(')) {
        var expression;
        match('(');
        expression = parseExpression();
        match(')');
        return expression;
    } else {
        error('Illegal start of expression');
    }
}

function parseLiteral() {
    if (at('void')) {
        return new VoidLiteral(match());
    } else if (at(['true' | 'false'])) {
        return new BooleanLiteral(match());
    } else if (at('IntegerLiteral')) {
        return new IntegerLiteral(match());
    } else if (at('RealLiteral')) {
        return new RealLiteral(match());
    } else if (at('CharacterLiteral')) {
        return new CharacterLiteral(match());
    } else if (at('StringLiteral')) {
        return new StringLiteral(match());
    } else {
        error('Illegal literal', tokens[0]);
    }
}

function at(symbol) {
    if (tokens.length === 0) {
        return false;
    } else if (Array.isArray(symbol)) {
        return symbol.some(function (s) {return at(s)});
    } else {
        return symbol === tokens[0].kind;
    }   
}

function match(symbol) {
    if (tokens.length === 0) {
        error('Unexpected end of input');
    } else if (symbol === undefined || symbol === tokens[0].kind) {
        return tokens.shift();
    } else {
        error('Expected ' + symbol + ' but found ' + tokens[0].kind, tokens[0]);
    }
}