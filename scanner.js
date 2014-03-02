/*
 * Scanner module
 *
 *     var scan = require('./scanner')
 *
 *     scan(filename, function (tokens) {processTheTokens(tokens)})
 */

var fs = require('fs')
var byline = require('byline')
var error = require('./error')
var indent = 0;
var indentSize = 4;

module.exports = function (filename, callback) {
    var baseStream = fs.createReadStream(filename, {encoding: 'utf8'})
    baseStream.on('error', function (err) {error(err)})

    var stream = byline(baseStream, {keepEmptyLines: true})
    var tokens = []
    var linenumber = 0
    stream.on('readable', function () {
        scan(stream.read(), ++linenumber, tokens)
    })
    stream.once('end', function () {
        tokens.push({kind: 'EOF', lexeme: 'EOF'})
        callback(tokens)
    })
}

function scan(line, linenumber, tokens) {
    if (!line) return

    var start, pos = 0

    function emit(kind, lexeme) {
        tokens.push({kind: kind, lexeme: lexeme || kind, line: linenumber, col: start+1})
    }

    while (true) {
        // Return token
        if (/0x0A/.test(line[pos]) {
            pos++
            emit('Return')
        }
        
        // Indent/Dedent tokens
        if (/0x20/.test(line[pos])) {
            
            while (/0x20/.test(line[pos])) {
                numSpaces++
                pos++
            }
            
            if (numSpaces >= indentSize) {
                indentSize += 4    
                emit('Indent')
            } else if ((indentSize > 4) && (numSpaces < indentSize) {
                indentSize -= 4
                emit('Dedent')
            }
        }

        // Comment
        if (line[pos] == '$') break

        // Two-character tokens
        if (/\+\+|--|<=|>=|!=|==|<<|>>|\*\*/.test(line.substring(pos, pos+2))) {
            emit(line.substring(pos, pos+2))
            pos += 2

        // One-character tokens
        } else if (/[<>|^&+*%~#:,()=.[]-]/.test(line[pos])) {
            emit(line[pos++])

        // Character literals
        } else if (/'.'/.test(line.substring(pos, pos+3))) {
            emit('CharacterLiteral', line.substring(pos, pos+3))
            pos += 3
            
        // String literals
        } else if (/"/.test(line[pos])) {
            pos++
            while (!/"/.test(line[pos]) && pos < line.length) pos++
            emit('StringLiteral', line.substring(start, pos+1))
            
        // Reserved words or identifiers
        } else if (/[A-Za-z]/.test(line[pos])) {
            while (/\w/.test(line[pos]) && pos < line.length) pos++
            var word = line.substring(start, pos)
            if (/^(?:global|local|print|while|for|break|continue|if|elif|else|switch|case|default|object|method|self|void|u_byte|u_short|u_int|u_long|byte|short|int|long|float|double|or|and|not|true|false)$/.test(word)) {
                emit(word)
            } else {
                emit('ID', word)
            }
    
        // Integer or Real literals
        } else if (/\d/.test(line[pos])) {
            while (/\d/.test(line[pos])) pos++
            if (/\.\d/.test(line.substring(pos, pos+2))) {
                pos++
                while (/\d/.test(line[pos])) pos++
                if (/[Ee][+-]?\d/.test(line.substring(pos, pos+3))) {
                    pos++
                    if (/[+-]/.test(line[pos])) {
                        pos++
                    }
                    while (/\d/.test(line[pos])) pos++
                }
                emit('RealLiteral', line.substring(start, pos))
            } else {
                emit('IntegerLiteral', line.substring(start, pos))
            }
    
        } else {
            error('Illegal character: ' + line[pos], {line: linenumber, col: pos+1})
            pos++
        }
    }
}
