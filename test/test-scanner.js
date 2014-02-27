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
  
  it('reads characters properly', function (done) {
    scan('test/data/token-tests/characters', function (tokens) {
      i(tokens[0]).should.equal(i({kind:'CharacterLiteral',lexeme:''a'',line:1,col:1}))
      i(tokens[1]).should.equal(i({kind:'CharacterLiteral',lexeme:''A'',line:1,col:5}))
      i(tokens[2]).should.equal(i({kind:'CharacterLiteral',lexeme:''b'',line:1,col:9}))
      i(tokens[3]).should.equal(i({kind:'CharacterLiteral',lexeme:''B'',line:1,col:13}))
      i(tokens[4]).should.equal(i({kind:'CharacterLiteral',lexeme:''c'',line:1,col:17}))
      i(tokens[5]).should.equal(i({kind:'CharacterLiteral',lexeme:''C'',line:1,col:21}))
      i(tokens[6]).should.equal(i({kind:'CharacterLiteral',lexeme:''d'',line:1,col:25}))
      i(tokens[7]).should.equal(i({kind:'CharacterLiteral',lexeme:''D'',line:1,col:29}))
      i(tokens[8]).should.equal(i({kind:'CharacterLiteral',lexeme:''e'',line:1,col:33}))
      i(tokens[9]).should.equal(i({kind:'CharacterLiteral',lexeme:''E'',line:1,col:37}))
      i(tokens[10]).should.equal(i({kind:'CharacterLiteral',lexeme:''f'',line:1,col:41}))
      i(tokens[11]).should.equal(i({kind:'CharacterLiteral',lexeme:''F'',line:1,col:45}))
      i(tokens[12]).should.equal(i({kind:'CharacterLiteral',lexeme:''g'',line:1,col:49}))
      i(tokens[13]).should.equal(i({kind:'CharacterLiteral',lexeme:''G'',line:1,col:53}))
      i(tokens[14]).should.equal(i({kind:'CharacterLiteral',lexeme:''h'',line:1,col:57}))
      i(tokens[15]).should.equal(i({kind:'CharacterLiteral',lexeme:''H'',line:1,col:61}))
      i(tokens[16]).should.equal(i({kind:'CharacterLiteral',lexeme:''i'',line:1,col:65}))
      i(tokens[17]).should.equal(i({kind:'CharacterLiteral',lexeme:''I'',line:1,col:69}))
      i(tokens[18]).should.equal(i({kind:'CharacterLiteral',lexeme:''j'',line:1,col:73}))
      i(tokens[19]).should.equal(i({kind:'CharacterLiteral',lexeme:''J'',line:1,col:77}))
      i(tokens[20]).should.equal(i({kind:'CharacterLiteral',lexeme:''k'',line:1,col:81}))
      i(tokens[21]).should.equal(i({kind:'CharacterLiteral',lexeme:''K'',line:1,col:85}))
      i(tokens[22]).should.equal(i({kind:'CharacterLiteral',lexeme:''l'',line:1,col:89}))
      i(tokens[23]).should.equal(i({kind:'CharacterLiteral',lexeme:''L'',line:1,col:93}))
      i(tokens[24]).should.equal(i({kind:'CharacterLiteral',lexeme:''m'',line:1,col:97}))
      i(tokens[25]).should.equal(i({kind:'CharacterLiteral',lexeme:''M'',line:1,col:101}))
      i(tokens[26]).should.equal(i({kind:'CharacterLiteral',lexeme:''n'',line:1,col:105}))
      i(tokens[27]).should.equal(i({kind:'CharacterLiteral',lexeme:''N'',line:1,col:109}))
      i(tokens[28]).should.equal(i({kind:'CharacterLiteral',lexeme:''o'',line:1,col:113}))
      i(tokens[29]).should.equal(i({kind:'CharacterLiteral',lexeme:''O'',line:1,col:117}))
      i(tokens[30]).should.equal(i({kind:'CharacterLiteral',lexeme:''p'',line:1,col:121}))
      i(tokens[31]).should.equal(i({kind:'CharacterLiteral',lexeme:''P'',line:1,col:125}))
      i(tokens[32]).should.equal(i({kind:'CharacterLiteral',lexeme:''q'',line:1,col:129}))
      i(tokens[33]).should.equal(i({kind:'CharacterLiteral',lexeme:''Q'',line:1,col:133}))
      i(tokens[34]).should.equal(i({kind:'CharacterLiteral',lexeme:''r'',line:1,col:137}))
      i(tokens[35]).should.equal(i({kind:'CharacterLiteral',lexeme:''R'',line:1,col:141}))
      i(tokens[36]).should.equal(i({kind:'CharacterLiteral',lexeme:''s'',line:1,col:145}))
      i(tokens[37]).should.equal(i({kind:'CharacterLiteral',lexeme:''S'',line:1,col:149}))
      i(tokens[38]).should.equal(i({kind:'CharacterLiteral',lexeme:''t'',line:1,col:153}))
      i(tokens[39]).should.equal(i({kind:'CharacterLiteral',lexeme:''T'',line:1,col:157}))
      i(tokens[40]).should.equal(i({kind:'CharacterLiteral',lexeme:''u'',line:1,col:161}))
      i(tokens[41]).should.equal(i({kind:'CharacterLiteral',lexeme:''U'',line:1,col:165}))
      i(tokens[42]).should.equal(i({kind:'CharacterLiteral',lexeme:''v'',line:1,col:169}))
      i(tokens[43]).should.equal(i({kind:'CharacterLiteral',lexeme:''V'',line:1,col:173}))
      i(tokens[44]).should.equal(i({kind:'CharacterLiteral',lexeme:''w'',line:1,col:177}))
      i(tokens[45]).should.equal(i({kind:'CharacterLiteral',lexeme:''W'',line:1,col:181}))
      i(tokens[46]).should.equal(i({kind:'CharacterLiteral',lexeme:''x'',line:1,col:185}))
      i(tokens[47]).should.equal(i({kind:'CharacterLiteral',lexeme:''X'',line:1,col:189}))
      i(tokens[48]).should.equal(i({kind:'CharacterLiteral',lexeme:''y'',line:1,col:193}))
      i(tokens[49]).should.equal(i({kind:'CharacterLiteral',lexeme:''Y'',line:1,col:197}))
      i(tokens[50]).should.equal(i({kind:'CharacterLiteral',lexeme:''z'',line:1,col:201}))
      i(tokens[51]).should.equal(i({kind:'CharacterLiteral',lexeme:''Z'',line:1,col:205}))
      i(tokens[52]).should.equal(i({kind:'CharacterLiteral',lexeme:''`'',line:1,col:209}))
      i(tokens[53]).should.equal(i({kind:'CharacterLiteral',lexeme:''~'',line:1,col:213}))
      i(tokens[54]).should.equal(i({kind:'CharacterLiteral',lexeme:''2'',line:1,col:217}))
      i(tokens[55]).should.equal(i({kind:'CharacterLiteral',lexeme:''@'',line:1,col:221}))
      i(tokens[56]).should.equal(i({kind:'CharacterLiteral',lexeme:''3'',line:1,col:225}))
      i(tokens[57]).should.equal(i({kind:'CharacterLiteral',lexeme:''#'',line:1,col:229}))
      i(tokens[58]).should.equal(i({kind:'CharacterLiteral',lexeme:''4'',line:1,col:233}))
      i(tokens[59]).should.equal(i({kind:'CharacterLiteral',lexeme:''$'',line:1,col:237}))
      i(tokens[60]).should.equal(i({kind:'CharacterLiteral',lexeme:''5'',line:1,col:241}))
      i(tokens[61]).should.equal(i({kind:'CharacterLiteral',lexeme:''%'',line:1,col:245}))
      i(tokens[62]).should.equal(i({kind:'CharacterLiteral',lexeme:''6'',line:1,col:249}))
      i(tokens[63]).should.equal(i({kind:'CharacterLiteral',lexeme:''^'',line:1,col:253}))
      i(tokens[64]).should.equal(i({kind:'CharacterLiteral',lexeme:''7'',line:1,col:257}))
      i(tokens[65]).should.equal(i({kind:'CharacterLiteral',lexeme:''&'',line:1,col:261}))
      i(tokens[66]).should.equal(i({kind:'CharacterLiteral',lexeme:''8'',line:1,col:265}))
      i(tokens[67]).should.equal(i({kind:'CharacterLiteral',lexeme:''*'',line:1,col:269}))
      i(tokens[68]).should.equal(i({kind:'CharacterLiteral',lexeme:''9'',line:1,col:273}))
      i(tokens[69]).should.equal(i({kind:'CharacterLiteral',lexeme:''('',line:1,col:277}))
      i(tokens[70]).should.equal(i({kind:'CharacterLiteral',lexeme:''0'',line:1,col:281}))
      i(tokens[71]).should.equal(i({kind:'CharacterLiteral',lexeme:'')'',line:1,col:285}))
      i(tokens[72]).should.equal(i({kind:'CharacterLiteral',lexeme:''-'',line:1,col:289}))
      i(tokens[73]).should.equal(i({kind:'CharacterLiteral',lexeme:''_'',line:1,col:293}))
      i(tokens[74]).should.equal(i({kind:'CharacterLiteral',lexeme:''='',line:1,col:297}))
      i(tokens[75]).should.equal(i({kind:'CharacterLiteral',lexeme:''+'',line:1,col:401}))
      i(tokens[76]).should.equal(i({kind:'CharacterLiteral',lexeme:''['',line:1,col:405}))
      i(tokens[77]).should.equal(i({kind:'CharacterLiteral',lexeme:''{'',line:1,col:409}))
      i(tokens[78]).should.equal(i({kind:'CharacterLiteral',lexeme:'']'',line:1,col:413}))
      i(tokens[79]).should.equal(i({kind:'CharacterLiteral',lexeme:''}'',line:1,col:417}))
      i(tokens[80]).should.equal(i({kind:'CharacterLiteral',lexeme:''\'',line:1,col:421}))
      i(tokens[81]).should.equal(i({kind:'CharacterLiteral',lexeme:''|'',line:1,col:425}))
      i(tokens[82]).should.equal(i({kind:'CharacterLiteral',lexeme:'';'',line:1,col:429}))
      i(tokens[83]).should.equal(i({kind:'CharacterLiteral',lexeme:'':'',line:1,col:433}))
      i(tokens[84]).should.equal(i({kind:'CharacterLiteral',lexeme:'','',line:1,col:437}))
      i(tokens[85]).should.equal(i({kind:'CharacterLiteral',lexeme:''<'',line:1,col:441}))
      i(tokens[86]).should.equal(i({kind:'CharacterLiteral',lexeme:''.'',line:1,col:445}))
      i(tokens[87]).should.equal(i({kind:'CharacterLiteral',lexeme:''>'',line:1,col:449}))
      i(tokens[88]).should.equal(i({kind:'CharacterLiteral',lexeme:''/'',line:1,col:453}))
      i(tokens[89]).should.equal(i({kind:'CharacterLiteral',lexeme:''?'',line:1,col:457}))
      i(tokens[90]).should.equal(i({kind:'CharacterLiteral',lexeme:'' '',line:1,col:461}))
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
      i(tokens[10]).should.equal(i({kind:'switch',lexeme:'switch',line:1,col:58}))
      i(tokens[11]).should.equal(i({kind:'case',lexeme:'case',line:1,col:65}))
      i(tokens[12]).should.equal(i({kind:'default',lexeme:'default',line:1,col:70}))
      i(tokens[13]).should.equal(i({kind:'object',lexeme:'object',line:1,col:78}))
      i(tokens[14]).should.equal(i({kind:'method',lexeme:'method',line:1,col:85}))
      i(tokens[15]).should.equal(i({kind:'self',lexeme:'self',line:1,col:92}))
      i(tokens[16]).should.equal(i({kind:'void',lexeme:'void',line:1,col:97}))
      i(tokens[17]).should.equal(i({kind:'u_byte',lexeme:'u_byte',line:1,col:102}))
      i(tokens[18]).should.equal(i({kind:'u_short',lexeme:'u_short',line:1,col:109}))
      i(tokens[19]).should.equal(i({kind:'u_int',lexeme:'u_int',line:1,col:117}))
      i(tokens[20]).should.equal(i({kind:'u_long',lexeme:'u_long',line:1,col:123}))
      i(tokens[21]).should.equal(i({kind:'byte',lexeme:'byte',line:1,col:130}))
      i(tokens[22]).should.equal(i({kind:'short',lexeme:'short',line:1,col:135}))
      i(tokens[23]).should.equal(i({kind:'int',lexeme:'int',line:1,col:141}))
      i(tokens[24]).should.equal(i({kind:'long',lexeme:'long',line:1,col:145}))
      i(tokens[25]).should.equal(i({kind:'float',lexeme:'float',line:1,col:150}))
      i(tokens[26]).should.equal(i({kind:'double',lexeme:'double',line:1,col:156}))
      i(tokens[27]).should.equal(i({kind:'or',lexeme:'or',line:1,col:163}))
      i(tokens[28]).should.equal(i({kind:'and',lexeme:'and',line:1,col:166}))
      i(tokens[29]).should.equal(i({kind:'not',lexeme:'not',line:1,col:170}))
      i(tokens[30]).should.equal(i({kind:'true',lexeme:'true',line:1,col:174}))
      i(tokens[31]).should.equal(i({kind:'false',lexeme:'false',line:1,col:179}))
      i(tokens[32]).should.equal(i({kind:'ID',lexeme:'whilexy',line:1,col:185}))
      i(tokens[33]).should.equal(i({kind:'ID',lexeme:'whil',line:1,col:193}))
      i(tokens[34]).should.equal(i({kind:'ID',lexeme:'ore',line:1,col:198}))
      i(tokens[35]).should.equal(i({kind:'ID',lexeme:'globallocal',line:1,col:202}))
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
