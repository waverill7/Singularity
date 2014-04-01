function Program(block) {
    this.block = block;
}

Program.prototype.toString = function () {
    return '(Program ' + this.block + ')';
}
    
module.exports = Program;
            