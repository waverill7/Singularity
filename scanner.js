/*
 * Scanner module
 *
 *     var scan = require('./scanner')
 *
 *     scan(filename, function (tokens) {processTheTokens(tokens)})
 */

var fs = require('fs');
var byline = require('byline');
var error = require('./error');

var indentSize = 4;

module.exports = function (filename, callback) {
    var baseStream = fs.createReadStream(filename, {encoding: 'utf8'});
    baseStream.on('error', function (err) {error(err)});

    var stream = byline(baseStream, {keepEmptyLines: true});
    var tokens = [];
    var linenumber = 0;
    
    stream.on('readable', function () {
        scan(stream.read(), ++linenumber, tokens);
    });
    stream.once('end', function () {
        tokens.push({kind: 'EOF', lexeme: 'EOF'});
        callback(tokens);
    });
}

function scan(line, linenumber, tokens) {
    var start = 0; 
    var pos = 0;

    function emit(kind, lexeme) {
        tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1});
    }

    while (true) {
        // Indent or Dedent Tokens
        if ((tokens.length > 0) && (tokens[tokens.length-1]["kind"] === 'Return')) {
            var numSpaces = 0;
            while ((/\040/.test(line[pos])) && (numSpaces < indentSize)) {
                pos++;
                numSpaces++;
            }
            if (numSpaces === indentSize) {
                indentSize += 4;
                emit('Indent');
            } else {
                while (numSpaces < (indentSize-4)) {
                    indentSize -= 4;
                    emit('Dedent');
                }
            }
        }
            
        // Skip Irrelevant Whitespace
        while (/\s/.test(line[pos])) {
            pos++;
        }
        start = pos;
        
        // Nothing on the Line
        if (pos >= line.length) {
            emit('Return');
            break;
        }

        // Comment
        if (line[pos] === '$') {
            emit('Return');
            break;
        }

        // Three-Character Tokens
        if (/<<=|>>=/.test(line.substring(pos, pos+3))) {
            emit(line.substring(pos, pos+3));
            pos += 3;

        // Two-Character Tokens
        } else if (/<=|>=|!=|==|<<|>>|\*\*|\+=|-=|\*=|\/=|%=|&=|\^=|\|=/.test(line.substring(pos, pos+2))) {
            emit(line.substring(pos, pos+2));
            pos += 2;

        // One-Character Tokens
        } else if (/[\|\^&<>\+\*\/%~\(\),=:\.\[\]-]/.test(line[pos])) {
            emit(line[pos]);
            pos++;

        // Character Literals
        } else if (/'.'/.test(line.substring(pos, pos+3))) {
            emit('CharacterLiteral', line.substring(pos, pos+3));
            pos += 3;
            
        // String Literals
        } else if (/"/.test(line[pos])) {
            pos++;
            while (!/"/.test(line[pos]) && pos < line.length) {
                pos++;
            }
            if (/"/.test(line[pos])) {
                emit('StringLiteral', line.substring(start, pos+1));
                pos++;
            } else {
                error('Unmatched String', {line: linenumber, col: start+1});
            }
            
        // Reserved Words or Identifiers
        } else if (/[a-zA-Z]/.test(line[pos])) {
            while (/\w/.test(line[pos]) && pos < line.length) {
                pos++;
            }
            var word = line.substring(start, pos);
            if (/^(?:global|local|print|while|for|break|continue|if|elif|else|object|self|void|or|and|not|true|false)$/.test(word)) {
                emit(word);
            } else {
                emit('ID', word);
            }
    
        // Integer or Real Literals
        } else if (/\d/.test(line[pos])) {
            while (/\d/.test(line[pos])) {
                pos++;
            }
            if (/\.\d/.test(line.substring(pos, pos+2))) {
                pos++;
                while (/\d/.test(line[pos])) {
                    pos++;
                }
                if (/[Ee][+\-]\d/.test(line.substring(pos, pos+3))) {
                    pos += 2;
                    while (/\d/.test(line[pos])) {
                        pos++;
                    }
                }
                emit('RealLiteral', line.substring(start, pos));
            } else {
                emit('IntegerLiteral', line.substring(start, pos));
            }
    
        } else {
            error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1});
            pos++;
        }
    }
}
