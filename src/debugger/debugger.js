import Sval from "sval";
import ace from "brace";
import { firebaseUtils } from "../db/firebase";

export class Debugger {
  constructor(storeContext) {
    this.variablesCode = storeContext.state.variablesEditor;
    this.implementationCode = storeContext.state.implementationEditor;

    this.storeContext = storeContext;

    this.jsCode =
      storeContext.state.variablesEditor +
      storeContext.state.implementationEditor;

    this.interpreter = new Sval();
  }

  getRange(code, node, startPos, editor) {
    let start = 0;
    let end = 0;
    let row = 0;

    for (let i = 0; i < code.length; i++) {
      if (i === startPos) {
        end = start + (node.end - node.start);
        break;
      }

      if (code[i] === "\n") {
        row++;
        start = 0;
      } else {
        start++;
      }
    }

    return {
      start: start,
      end: end,
      row: row,
      editor: editor,
    };
  }

  getHighlightPosition(node) {
    let range;

    if (node.start < this.variablesCode.length) {
      range = this.getRange(
        this.variablesCode,
        node,
        node.start,
        "variablesAceEditor"
      );
    } else {
      const startPos = node.start - this.variablesCode.length;
      range = this.getRange(
        this.implementationCode,
        node,
        startPos,
        "implementationAceEditor"
      );
      range.clearVariablesEditorMarker = true;
    }

    return range;
  }

  runSlowMode() {
    let self = this;
    const successRun = this.runInterpreter();

    if (successRun) {
      this.storeContext.commit("setRunningCode", true);

      const contextStack = this.interpreter.scope.context.exports.contextStack;

      let interval = setInterval(function() {
        if (contextStack.length) {
          const currentContext = contextStack.shift();
          currentContext.pos = self.getHighlightPosition(currentContext.node);
          self.setVariables(currentContext);

          if (currentContext.node.type === "CallExpression") {
            self.appendLog(currentContext.node.arguments[0]);
          }
        } else {
          clearInterval(interval);
          self.setVariables(null, true);
        }
      }, 1200);
    }
  }

  runAllCode() {
    this.runInterpreter();
    const contextStack = this.interpreter.scope.context.exports.contextStack;
    const result = this.interpreter.scope.context["resultado"];

    const logSentences = contextStack
      .filter((context) => context.node.type === "CallExpression")
      .map((log) => log.node.arguments[0]);
    logSentences.forEach((sentence) => this.appendLog(sentence));

    if (contextStack && contextStack.length) {
      return {
        value: result ? result.value : null,
        context: contextStack[contextStack.length - 1],
      };
    }
  }

  appendLog(sentence) {
    const log = { value: "" };
    this.addConsoleLog(sentence, log);

    if (log.value) {
      this.storeContext.commit("appendToConsole", {
        value: log.value,
        type: "log",
      });
    }
  }

  addConsoleLog(node, log) {
    if (node) {
      this.getNodeValue(node, log);
      this.addConsoleLog(node.left, log);
      this.addConsoleLog(node.right, log);
    }
  }

  getNodeValue(node, log) {
    if (node.type === "Literal") {
      log.value += node.value;
    } else if (node.type === "Identifier") {
      log.value += this.interpreter.scope.context[node.name].value;
    }
  }

  setVariables(svalContext, isLastExecution) {
    if (isLastExecution) {
      if (this.storeContext.state.implementationEditor) {
        this.storeContext.state.implementationAceEditor
          .getSession()
          .removeMarker(this.storeContext.currentMarker);
      } else {
        this.storeContext.state.variablesAceEditor
          .getSession()
          .removeMarker(this.storeContext.currentMarker);
      }
      this.storeContext.state.isRunningCode = false;
      return;
    }

    const pos = svalContext.pos;

    if (pos.clearVariablesEditorMarker) {
      this.storeContext.state.variablesAceEditor
        .getSession()
        .removeMarker(this.storeContext.currentMarker);
    }

    if (this.storeContext.currentMarker) {
      this.storeContext.state[pos.editor]
        .getSession()
        .removeMarker(this.storeContext.currentMarker);
    }

    let Range = ace.acequire("ace/range").Range;
    const newRange = new Range(pos.row, pos.start, pos.row, pos.end);
    this.storeContext.currentMarker = this.storeContext.state[pos.editor]
      .getSession()
      .addMarker(newRange, "myMarker", "text");

    this.storeContext.commit("setDeclaredVariables", svalContext.variables);
  }

  runInterpreter() {
    try {
      this.interpreter.run(this.jsCode);
      return true;
    } catch (error) {
      alert(
        "Error al interpretar el código ingresado. Para más detalles por favor revisar la consola."
      );
      if (
        this.storeContext.state.currentExercise.id &&
        this.storeContext.state.currentExercise.folderId
      )
        firebaseUtils.updateExerciseStadistics(
          error.toString().split(":")[0],
          this.storeContext.state.currentExercise.folderId,
          this.storeContext.state.currentExercise.id
        );

      this.storeContext.commit("appendToConsole", {
        value: error,
        type: "error",
      });

      return false;
    }
  }

  runDebugMode() {
    this.storeContext.state.isDebugging = true;

    this.runInterpreter();

    this.contextStack = this.interpreter.scope.context.exports.contextStack;
    this.next();
  }

  next() {
    if (this.contextStack && this.contextStack.length) {
      const currentContext = this.contextStack.shift();
      currentContext.pos = this.getHighlightPosition(currentContext.node);
      this.setVariables(currentContext);

      if (currentContext.node.type === "CallExpression") {
        this.appendLog(currentContext.node.arguments[0]);
      }
    } else {
      this.setVariables(null, true);
      this.storeContext.state.isDebugging = false;
    }
    return this.storeContext.state.isDebugging;
  }

  finishDebugMode() {
    while (this.next());
  }

  stop() {
    this.setVariables(null, true);
    this.storeContext.state.isDebugging = false;
  }
}
