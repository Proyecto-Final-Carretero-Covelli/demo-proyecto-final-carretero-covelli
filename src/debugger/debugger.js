import Sval from 'sval';

export class Debugger {

    constructor(jsCode) {

        this.jsCode = jsCode;

        this.interpreter = new Sval();
        this.parsedNodes = this.interpreter.parse(jsCode).body;

        this.parsedNodes.forEach(node => {
            if (!node.body) {
                node.body = node;
            }
        });

        console.log(this.parsedNodes);

    }

    next() {

        if (this.parsedNodes) {
            const nodeToInterpret = this.parsedNodes[0];

            if (nodeToInterpret.type === 'IfStatement') {

                const conditionNode = nodeToInterpret.test;
                const conditionCode = this.jsCode.substring(conditionNode.start, conditionNode.end);

                this.interpreter.run('exports.isTrueCondition=' + conditionCode +  ';');

                if (this.interpreter.exports.isTrueCondition) {
                    const thenStatement = nodeToInterpret.consequent;
                    thenStatement.body.forEach(node => {
                        node.body = node;
                    });
                    this.parsedNodes.shift();
                    this.parsedNodes = thenStatement.body.concat(this.parsedNodes);
                } else {
                    const elseStatement = nodeToInterpret.alternate;

                    if (elseStatement) {
                        elseStatement.body.forEach(node => {
                            node.body = node;
                        });
                        this.parsedNodes.shift();
                        this.parsedNodes = elseStatement.body.concat(this.parsedNodes);
                    } else {
                        this.parsedNodes.shift();
                    }
                }

            } else {
                this.interpreter.run(this.parsedNodes[0]);
                this.parsedNodes.shift();
            }
        }

    }

}