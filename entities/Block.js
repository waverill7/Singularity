function Block(statements) {
    this.statements = statements;
}

Block.prototype.toString = function () {
    return '(Block ' + this.statements.join(' ') + ')';
} 

module.exports = Block;