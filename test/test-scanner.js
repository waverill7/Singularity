var should = require('should');
var scan = require('../scanner')
var error = require('../error')
var i = require('util').inspect

describe('The scanner', function () {

  it('scans the simplest program', function (done) {
    scan('test/data/good-programs/hello.singularity', function (tokens) {
      tokens.length.should.equal(2)
      i(tokens[0]).should.equal(i({kind:'print',lexeme:'print',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'StringLiteral',lexeme:'"Hello, World!"',line:1,col:7}))
      i(tokens[2]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })

  it('properly handles comments and blank lines', function (done) {
    scan('test/data/token-tests/comments-and-blank-lines', function (tokens) {
      tokens.length.should.equal(4)
      i(tokens[0]).should.equal(i({kind:'var',lexeme:'var',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'ID',lexeme:'x',line:3,col:3}))
      i(tokens[2]).should.equal(i({kind:';',lexeme:';',line:5,col:7}))
      i(tokens[3]).should.equal(i({kind:'EOF',lexeme:'EOF'}))
      done()
    })
  })
  
  it('reads symbolic tokens properly', function (done) {
    scan('test/data/token-tests/symbols', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'++',lexeme:'++',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'--',lexeme:'--',line:1,col:3}))
      i(tokens[2]).should.equal(i({kind:'<=',lexeme:'<=',line:1,col:5}))
      i(tokens[3]).should.equal(i({kind:'>=',lexeme:'>=',line:1,col:7}))
      i(tokens[4]).should.equal(i({kind:'!=',lexeme:'!=',line:1,col:9}))
      i(tokens[5]).should.equal(i({kind:'==',lexeme:'==',line:1,col:11}))
      i(tokens[6]).should.equal(i({kind:'<<',lexeme:'<<',line:1,col:13}))
      i(tokens[7]).should.equal(i({kind:'>>',lexeme:'>>',line:1,col:15}))
      i(tokens[8]).should.equal(i({kind:'**',lexeme:'**',line:1,col:17}))
      i(tokens[9]).should.equal(i({kind:'<',lexeme:'<',line:1,col:19}))
      i(tokens[10]).should.equal(i({kind:'>',lexeme:'>',line:1,col:20}))
      i(tokens[11]).should.equal(i({kind:'|',lexeme:'|',line:1,col:21}))
      i(tokens[12]).should.equal(i({kind:'^',lexeme:'^',line:1,col:22}))
      i(tokens[13]).should.equal(i({kind:'&',lexeme:'&',line:1,col:23}))
      i(tokens[14]).should.equal(i({kind:'+',lexeme:'+',line:1,col:24}))
      i(tokens[15]).should.equal(i({kind:'*',lexeme:'*',line:1,col:25}))
      i(tokens[16]).should.equal(i({kind:'%',lexeme:'%',line:1,col:26}))
      i(tokens[17]).should.equal(i({kind:'~',lexeme:'~',line:1,col:27}))
      i(tokens[18]).should.equal(i({kind:'#',lexeme:'#',line:1,col:28}))
      i(tokens[19]).should.equal(i({kind:':',lexeme:':',line:1,col:29}))
      i(tokens[20]).should.equal(i({kind:',',lexeme:',',line:1,col:30}))
      i(tokens[21]).should.equal(i({kind:'(',lexeme:'(',line:1,col:31}))
      i(tokens[22]).should.equal(i({kind:')',lexeme:')',line:1,col:32}))
      i(tokens[23]).should.equal(i({kind:'=',lexeme:'=',line:1,col:33}))
      i(tokens[24]).should.equal(i({kind:'.',lexeme:'.',line:1,col:34}))
      i(tokens[25]).should.equal(i({kind:'[',lexeme:'[',line:1,col:35}))
      i(tokens[26]).should.equal(i({kind:']',lexeme:']',line:1,col:36}))
      i(tokens[27]).should.equal(i({kind:'-',lexeme:'-',line:1,col:37}))
      done()
    })
  })

  it('distinguishes reserved words and identifiers', function (done) {
    scan('test/data/token-tests/words', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'global',lexeme:'global',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'local',lexeme:'local',line:1,col:8}))
      i(tokens[2]).should.equal(i({kind:'print',lexeme:'print',line:1,col:14}))
      i(tokens[3]).should.equal(i({kind:'while',lexeme:'while',line:1,col:20}))
      i(tokens[4]).should.equal(i({kind:'for',lexeme:'for',line:1,col:26}))
      i(tokens[5]).should.equal(i({kind:'break',lexeme:'break',line:1,col:30}))
      i(tokens[6]).should.equal(i({kind:'continue',lexeme:'continue',line:1,col:36}))
      i(tokens[7]).should.equal(i({kind:'if',lexeme:'if',line:1,col:45}))
      i(tokens[8]).should.equal(i({kind:'elif',lexeme:'elif',line:1,col:48}))
      i(tokens[9]).should.equal(i({kind:'else',lexeme:'else',line:1,col:53}))
      i(tokens[11]).should.equal(i({kind:'switch',lexeme:'switch',line:1,col:58}))
      i(tokens[13]).should.equal(i({kind:'case',lexeme:'case',line:1,col:65}))
      i(tokens[15]).should.equal(i({kind:'default',lexeme:'default',line:1,col:70}))
      i(tokens[17]).should.equal(i({kind:'object',lexeme:'object',line:1,col:78}))
      i(tokens[19]).should.equal(i({kind:'method',lexeme:'method',line:1,col:85}))
      i(tokens[21]).should.equal(i({kind:'self',lexeme:'self',line:1,col:92}))
      i(tokens[23]).should.equal(i({kind:'void',lexeme:'void',line:1,col:97}))
      i(tokens[23]).should.equal(i({kind:'u_byte',lexeme:'u_byte',line:1,col:102}))
      i(tokens[23]).should.equal(i({kind:'u_short',lexeme:'u_short',line:1,col:109}))
      i(tokens[23]).should.equal(i({kind:'u_int',lexeme:'u_int',line:1,col:117}))
      i(tokens[23]).should.equal(i({kind:'u_long',lexeme:'u_long',line:1,col:123}))
      i(tokens[23]).should.equal(i({kind:'byte',lexeme:'byte',line:1,col:130}))
      i(tokens[23]).should.equal(i({kind:'short',lexeme:'short',line:1,col:135}))
      i(tokens[23]).should.equal(i({kind:'int',lexeme:'int',line:1,col:141}))
      i(tokens[23]).should.equal(i({kind:'long',lexeme:'long',line:1,col:145}))
      i(tokens[23]).should.equal(i({kind:'float',lexeme:'float',line:1,col:150}))
      i(tokens[23]).should.equal(i({kind:'double',lexeme:'double',line:1,col:156}))
      i(tokens[23]).should.equal(i({kind:'or',lexeme:'or',line:1,col:163}))
      i(tokens[23]).should.equal(i({kind:'and',lexeme:'and',line:1,col:166}))
      i(tokens[23]).should.equal(i({kind:'not',lexeme:'not',line:1,col:170}))
      i(tokens[23]).should.equal(i({kind:'true',lexeme:'true',line:1,col:174}))
      i(tokens[23]).should.equal(i({kind:'false',lexeme:'false',line:1,col:179}))
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'whilexy',line:1,col:185}))
      i(tokens[2]).should.equal(i({kind:'ID',lexeme:'whil',line:1,col:193}))
      i(tokens[8]).should.equal(i({kind:'ID',lexeme:'ore',line:1,col:198}))
      i(tokens[11]).should.equal(i({kind:'ID',lexeme:'globallocal',line:1,col:202}))
      done()
    })
  })

  it('scans numbers properly', function (done) {
    scan('test/data/token-tests/numbers', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'ID',lexeme:'loop89x7',line:1,col:1}))
      i(tokens[2]).should.equal(i({kind:'INTLIT',lexeme:'222289',line:1,col:10}))
      i(tokens[3]).should.equal(i({kind:'ID',lexeme:'while9',line:1,col:16}))
      i(tokens[4]).should.equal(i({kind:'INTLIT',lexeme:'02',line:1,col:23}))
      done()
    })
  })

  it('detects illegal characters', function (done) {
    scan('test/data/token-tests/illegal-char', function () {
      error.count.should.equal(1)
      done()
    })
  })})
