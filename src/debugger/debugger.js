import Sval from "sval";

export class Debugger {
  constructor(jsCode) {
    this.jsCode = jsCode;

    this.interpreter = new Sval();
    this.parsedNodes = this.interpreter.parse(jsCode).body;

    this.setNodesBody(this.parsedNodes);
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
      if (!variable.value.__ob__) {
        userVariables.push(variable);
      }
    }

    return userVariables;
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
