import Sval from 'sval';

export class Debugger {

    constructor(jsCode) {

        this.jsCode = jsCode;

        this.interpreter = new Sval();
        this.parsedNodes = this.interpreter.parse(jsCode).body;

        this.setNodesBody(this.parsedNodes);

        console.log(this.parsedNodes);

    }

    setNodesBody(nodes) {
        nodes.forEach(node => {
            if (!node.body) {
                node.body = node;
            }
        });
    }

    isTrueCondition(conditionCode) {
        this.interpreter.run('exports.isTrueCondition=' + conditionCode +  ';');
        return this.interpreter.exports.isTrueCondition;
    }

    next() {

        if (this.parsedNodes) {
            const nodeToInterpret = this.parsedNodes.shift();

            if (nodeToInterpret.type === 'IfStatement') {
                this.debugIfStatement(nodeToInterpret);
            } else {
                this.interpreter.run(nodeToInterpret);
            }
        }

    }

    debugIfStatement(nodeToInterpret) {
        const conditionNode = nodeToInterpret.test;
        const conditionCode = this.jsCode.substring(conditionNode.start, conditionNode.end);

        if (this.isTrueCondition(conditionCode)) {
            this.concatBlockStatement(nodeToInterpret.consequent);
        } else {
            this.concatBlockStatement(nodeToInterpret.alternate);
        }
    }

    concatBlockStatement(blockStatement) {
        if (blockStatement) {
            const blockStatementBody = blockStatement.body;
            this.setNodesBody(blockStatementBody);
            this.parsedNodes = blockStatementBody.concat(this.parsedNodes);
        }
    }

}