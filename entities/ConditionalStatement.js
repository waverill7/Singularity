function ConditionalStatement(IF, ELIF, ELSE) {
    this.IF = IF;
    this.ELIF = ELIF;
    this.ELSE = ELSE;
}

ConditionalStatement.prototype.toString = function () {
    var ifPartition = '(if ' + this.IF[0] + ' ' + this.IF[1] + ')';
    var elifPartitions = [];
    for (var i = 0; i < this.ELIF.length; i += 2) {
    	elifPartitions.push('(elif ' + this.ELIF[i] + ' ' + this.ELIF[i+1] + ')');
    }
    var elsePartition = '(else ' + this.ELSE[0] + ' ' + this.ELSE[1] + ')';
    return '(ConditionalStatement ' + ifPartition + ' ' + elifPartitions.join(' ') + ' ' + elsePartition + ')';
} 

module.exports = ConditionalStatement;
