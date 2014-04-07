function ConditionalStatement(IF, ELIF, ELSE) {
    this.IF = IF;
    this.ELIF = ELIF;
    this.ELSE = ELSE;
}

ConditionalStatement.prototype.toString = function () {
    ifPartition = '(if ' + this.IF + ')';
    elifPartitions = [];
    for (var i = 0; i < this.ELIF.length; i += 2) {
    	elifPartitions.push('(elif ' + this.ELIF[i] + ' ' + this.ELIF[i+1] + ')');
    }
    elsePartition = '(else ' + this.ELSE + ')';
    return '(ConditionalStatement ' + ifPartition + ' ' + elifPartitions.join(' ') + ' ' + elsePartition + ')';
} 

module.exports = ConditionalStatement;
