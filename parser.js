/*
 * Parser module
 *
 *   var parse = require('./parser')
 *
 *   var program = parse(tokens)
 */

var scanner = require('./scanner');
var error = require('./error');

var Program = require('./entities/Program');
var Block = require('./entities/Block');
var VariableDeclaration = require('./entities/VariableDeclaration');
var FunctionDeclaration = require('./entities/FunctionDeclaration');
var MethodDeclaration = require('./entities/MethodDeclaration');
var ObjectDeclaration = require('./entities/ObjectDeclaration');
var AssignmentStatement = require('./entities/AssignmentStatement');
var Attribute = require('./entities/Attribute');
var Call = require('./entities/Call');
var Matrix = require('./entities/Matrix');
var PrintStatement = require('./entities/PrintStatement');
var ConditionalStatement = require('./entities/ConditionalStatement');
var WhileStatement = require('./entities/WhileStatement');
var ForStatement = require('./entities/ForStatement');
var BreakStatement = require('./entities/BreakStatement');
var ContinueStatement = require('./entities/ContinueStatement');
var InfixExpression = require('./entities/InfixExpression');
var PrefixExpression = require('./entities/PrefixExpression');
var VoidLiteral = require('./entities/VoidLiteral');
var BooleanLiteral = require('./entities/BooleanLiteral');
var IntegerLiteral = require('./entities/IntegerLiteral');
var RealLiteral = require('./entities/RealLiteral');
var CharacterLiteral = require('./entities/CharacterLiteral');
var StringLiteral = require('./entities/StringLiteral');
var MatrixLiteral = require('./entities/MatrixLiteral');
var VariableReference = require('./entities/VariableReference');

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
    } while (at(['Return', 'global', 'local', 'ID', 'self', 'print', 'if', 'while', 'for', 'break', 'continue']));
    return new Block(statements);
}

function parseStatement() {
    if (at(['global', 'local'])) {
        return parseDeclarationStatement();
    } else if (at(['ID', 'self'])) {
        return parseAssignmentStatement();
    } else if (at('print')) {
        return parsePrintStatement();
    } else if (at('if')) {
        return parseConditionalStatement();
    } else if (at('while')) {
        return parseWhileStatement();
    } else if (at('for')) {
        return parseForStatement();
    } else if (at('break')) {
        return parseBreakStatement();
    } else if (at('continue')) {
        return parseContinueStatement();
    } else {
        error('Statement Expected', tokens[0]);
    }
}

function parseDeclarationStatement() {
    var scope = match().lexeme;
    var name;
    if (at('ID')) {
        name = new VariableReference(match());
        if (at('=')) {
            return parseVariableDeclaration(scope, name);
        } else {
            match('(');
            if (at(['ID', 'void'])) {
                return parseFunctionDeclaration(scope, name);
            } else {
                return parseMethodDeclaration(scope, name);
            }    
        }
    } else {
        return parseObjectDeclaration(scope);
    }   
}

function parseVariableDeclaration(scope, name) {
    var expression;
    match('=');
    expression = parseExpression();
    return new VariableDeclaration(scope, name, expression);
}   

function parseFunctionDeclaration(scope, name) {
    var parameters = [];
    var value;
    var body;
    if (at('void')) {
        parameters.push(new VoidLiteral(match()));
    } else {
        parameters.push(new VariableReference(match('ID')));
        while (at(',')) {
            match();
            parameters.push(new VariableReference(match('ID')));
        }
    }
    match(')');
    match('=');
    if (at('ID')) {
        value = new VariableReference(match());
    } else {
        value = new VoidLiteral(match('void'));
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new FunctionDeclaration(scope, name, parameters, value, body);
}

function parseMethodDeclaration(scope, name) {
    var parameters = [];
    var value;
    var body;
    parameters.push(match('self').lexeme);
    while (at(',')) {
        match();
        parameters.push(new VariableReference(match('ID')));
    }
    match(')');
    match('=');
    if (at('ID')) {
        value = new VariableReference(match());
    } else if (at('void')) {
        value = new VoidLiteral(match());
    } else {
        value = match('self').lexeme;
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return MethodDeclaration(scope, name, parameters, value, body);
}

function parseObjectDeclaration(scope) {
    var name;
    var inheritance = [];
    var body;
    match('object');
    name = new VariableReference(match('ID'));
    if (at('(')) {
        match();
        inheritiance.push(new VariableReference(match('ID')));
        while (at(',')) {
            match();
            inheritance.push(new VariableReference(match('ID')));
        }
        match(')');
    }
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new ObjectDeclaration(scope, name, inheritance, body);
}

function parseAssignmentStatement() {
    var left;
    var operator;
    var right;
    if (at('self')) {
        left = parseAttribute();
    } else {
        var name = new VariableReference(match('ID'));
        if (at('.')) {
            left = parseAttribute(name);
        } else if (at('(')) {
            left = parseCall(name);
        } else if (at('[')) {
            left = parseMatrix(name);
        } else {
            left = name;
        }
    }
    if (at(['=', '+=', '-=', '*=', '/=', '%=', '&=', '^=', '|=', '<<=', '>>='])) {
        operator = match();
    }
    right = parseExpression();
    return new AssignmentStatement(left, operator, right);
}

function parseAttribute(name) {
    var property;
    if (at('self')) {
        name = match().lexeme;
    }
    match('.');
    var propertyName = new VariableReference(match('ID'));
    if (at('(')) {
        property = parseCall(propertyName);
    } else if (at('[')) {
        property = parseMatrix(propertyName);
    } else {
        property = propertyName;
    }
    return new Attribute(name, property);    
}

function parseCall(name) {
    var expressions = [];
    match('(');
    if (at(')')) {
        match();
    } else {
        expressions.push(parseExpression());
        while (at(',')) {
            match();
            expressions.push(parseExpression());
        }
        match(')');
    }
    return new Call(name, expressions);
}

function parseMatrix(name) {
    var expressions = [];
    match('[');
    expressions.push(parseExpression());
    while (at(',')) {
        match();
        expressions.push(parseExpression());
    }
    match(']');
    return new Matrix(name, expressions);
}

function parsePrintStatement() {
    var expression;
    match('print');
    expression = parseExpression();
    return new PrintStatement(expression);
}

function parseConditionalStatement() {
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
    return new ConditionalStatement(IF, ELIF, ELSE);
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
    var update;
    var body;
    match('for');
    initialization = parseAssignmentStatement();
    match(',');
    condition = parseExpression();
    match(',');
    update = parseAssignmentStatement();
    match(':');
    match('Return');
    match('Indent');
    body = parseBlock();
    match('Dedent');
    return new ForStatement(initialization, condition, update, body);
}

function parseBreakStatement() {
    match('break');
    return new BreakStatement();
}

function parseContinueStatement() {
    match('continue');
    return new ContinueStatement();
}

function parseExpression() {
    var left;
    var operator;
    var right;
    left = parseExpression_1();
    while (at('or')) {
        operator = match();
        right = parseExpression_1();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_1() {
    var left;
    var operator;
    var right;
    left = parseExpression_2();
    while (at('and')) {
        operator = match();
        right = parseExpression_2();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_2() {
    var left;
    var operator;
    var right;
    left = parseExpression_3();
    while (at('|')) {
        operator = match();
        right = parseExpression_3();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_3() {
    var left;
    var operator;
    var right;
    left = parseExpression_4();
    while (at('^')) {
        operator = match();
        right = parseExpression_4();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_4() {
    var left;
    var operator;
    var right;
    left = parseExpression_5();
    while (at('&')) {
        operator = match();
        right = parseExpression_5();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_5() {
    var left;
    var operator;
    var right;
    left = parseExpression_6();
    if (at(['==', '!='])) { 
        operator = match();
        right = parseExpression_6();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_6() {
    var left;
    var operator;
    var right;
    left = parseExpression_7();
    if (at(['<', '<=', '>', '>='])) {
        operator = match();
        right = parseExpression_7();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_7() {
    var left;
    var operator;
    var right;
    left = parseExpression_8();
    while (at(['<<', '>>'])) {
        operator = match();
        right = parseExpression_8();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_8() {
    var left;
    var operator;
    var right;
    left = parseExpression_9();
    while (at(['+', '-'])) {
        operator = match();
        right = parseExpression_9();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_9() {
    var left;
    var operator;
    var right;
    left = parseExpression_10();
    while (at(['*', '/', '%'])) {
        operator = match();
        right = parseExpression_10();
        left = new InfixExpression(left, operator, right);
    }
    return left;
}

function parseExpression_10() {
    var operator;
    var operand;
    if (at(['not', '~', '+', '-'])) {
        operator = match();
        operand = parseExpression_11();
        return new PrefixExpression(operator, operand);
    } else {
        return parseExpression_11();
    }
}

function parseExpression_11() {
  var left;
  var operator;
  var right;
  left = parseExpression_12();
  while (at('**')) {
    operator = match();
    right = parseExpression_12();
    left = new InfixExpression(left, operator, right);
  }
  return left;
}

function parseExpression_12() {
    if (at('self')) {
        return parseAttribute();
    } else if (at('ID')) {
        var name = new VariableReference(match());
        if (at('.')) {
            return parseAttribute(name);
        } else if (at('(')) {
            return parseCall(name);
        } else if (at('[')) {
            return parseMatrix(name);
        } else {
            return name;
        }
    } else if (at('(')) {
        var expression;
        match('(');
        expression = parseExpression();
        match(')');
        return expression;
    } else if (at(['void','true','false','IntegerLiteral','RealLiteral','CharacterLiteral','StringLiteral', '['])) {
        return parseLiteral();
    } else {
        error('Illegal Start Of Expression');
    }
}

function parseLiteral() {
    if (at('void')) {
        return parseVoidLiteral();
    } else if (at(['true', 'false'])) {
        return parseBooleanLiteral();
    } else if (at('IntegerLiteral')) {
        return parseIntegerLiteral();
    } else if (at('RealLiteral')) {
        return parseRealLiteral();
    } else if (at('CharacterLiteral')) {
        return parseCharacterLiteral();
    } else if (at('StringLiteral')) {
        return parseStringLiteral();
    } else if (at('[')) {
        return parseMatrixLiteral();
    } else {
        error('Illegal Literal', tokens[0]);
    }
}

function parseVoidLiteral() {
    return new VoidLiteral(match('void'));
}

function parseBooleanLiteral() {
    if (at('true')) {
        return new BooleanLiteral(match('true'));
    } else {
        return new BooleanLiteral(match('false'));
    }
}

function parseIntegerLiteral() {
    return new IntegerLiteral(match('IntegerLiteral'));
}

function parseRealLiteral() {
    return new RealLiteral(match('RealLiteral'));
}

function parseCharacterLiteral() {
    return new CharacterLiteral(match('CharacterLiteral'));
}

function parseStringLiteral() {
    return new StringLiteral(match('StringLiteral'));
}

function parseMatrixLiteral() {
    var expressions = [];
    match('[');
    expressions.push(parseExpression());
    while (at(',')) {
        match();
        expressions.push(parseExpression());
    }
    match(']');
    return new MatrixLiteral(expressions);
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
        error('Unexpected End Of Input');
    } else if (symbol === undefined || symbol === tokens[0].kind) {
        return tokens.shift();
    } else {
        error('Expected ' + symbol + ' But Found ' + tokens[0].kind, tokens[0]);
    }
}
