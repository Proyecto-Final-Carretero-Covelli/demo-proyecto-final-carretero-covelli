import Sval from "sval";
//import ace from 'brace';

export class Debugger {
  constructor(settings) {

    this.variablesCode = settings.variablesContent;
    this.implementationCode = settings.implementationContent;

    this.variablesEditor = settings.variablesEditor;
    this.implementationEditor = settings.implementationEditor;

    this.jsCode = this.variablesCode + this.implementationCode;

    this.interpreter = new Sval();
    this.parsedNodes = this.interpreter.parse(this.jsCode).body;

    this.setNodesBody(this.parsedNodes);
  }

  runSlowMode(callback) {
    let self = this;

    var myVar = setInterval(runNode, 1000);

    function runNode() {

      if (self.parsedNodes.length) {
        const node = self.parsedNodes.shift();

        /*let Range = ace.acequire('ace/range').Range;

        const newRange = new Range(0, node.start, 0, node.end);
        self.variablesEditor.getSession().addMarker(newRange, 'myMarker', 'text');*/

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
    return variable.name != 'window' && variable.name != 'this'
      && variable.name != 'exports' && (typeof variable.value != 'function');
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
