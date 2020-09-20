import Sval from "sval";

export class Debugger {
  constructor(jsCode) {
    this.jsCode = jsCode;

    this.interpreter = new Sval();
    this.parsedNodes = this.interpreter.parse(jsCode).body;

    this.setNodesBody(this.parsedNodes);
  }

  runSlowMode(callback) {
    let self = this;

    var myVar = setInterval(runNode, 1000);

    function runNode() {

      if (self.parsedNodes.length) {
        const node = self.parsedNodes.shift();
        self.interpreter.run(node);
        callback();
      } else {
        clearInterval(myVar);
      }

    }

  }

  setNodesBody(nodes) {
    nodes.forEach((node) => {
      if (!node.body) {
        node.body = node;
      }
    });
  }

  isTrueCondition(conditionCode) {
    this.interpreter.run("exports.isTrueCondition=" + conditionCode + ";");
    return this.interpreter.exports.isTrueCondition;
  }

  runAllCode() {
    this.interpreter.run(this.jsCode);
    return this.interpreter.scope.context["resultado"].value;
  }

  getVariables() {
    const variables = this.interpreter.scope.context;
    const userVariables = [];

    for (let variableName in variables) {
      const variable = {
        name: variableName,
        value: variables[variableName].value,
      };

      // If var does not have ob property, then it was defined by the user.
      if (this.isVariableType(variable)) {
        userVariables.push(variable);
      }
    }

    return userVariables;
  }

  isVariableType(variable) {
    return !variable.value.__ob__ && (typeof variable.value != 'function');
  }

  next() {
    if (this.parsedNodes) {
      const nodeToInterpret = this.parsedNodes.shift();
      if (nodeToInterpret.type === "IfStatement") {
        this.debugIfStatement(nodeToInterpret);
      } else {
        this.interpreter.run(nodeToInterpret);
      }
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
