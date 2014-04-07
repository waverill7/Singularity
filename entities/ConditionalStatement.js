function ConditionalStatement(IF, ELIF, ELSE) {
    this.IF = IF;
    this.ELIF = ELIF;
    this.ELSE = ELSE;
}

ConditionalStatement.prototype.toString = function () {
    var ifPartition = '(if ' + this.IF + ')';
    var elifPartitions = [];
    for (var i = 0; i < this.ELIF.length; i += 2) {
    	elifPartitions.push('(elif ' + this.ELIF[i] + ' ' + this.ELIF[i+1] + ')');
    }
    var elsePartition = '(else ' + this.ELSE + ')';
    return '(ConditionalStatement ' + ifPartition + ' ' + elifPartitions.join(' ') + ' ' + elsePartition + ')';
} 

module.exports = ConditionalStatement;
