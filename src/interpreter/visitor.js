const ops = {
    ADD: '+',
    SUB: '-',
    MUL: '*',
    DIV: '/'
}

export class Visitor {

    constructor(globalScope) {
        this.globalScope = globalScope;
    }
    
    visitNodes(nodes) {
        for (const node of nodes) {
            this.visitNode(node);
        }
    }
    
    run(nodes) {
        return this.visitNodes(nodes);
    }

    visitNode(node) {
        switch (node.type) {
            case 'Literal':
                return this.visitLiteral(node);
            case 'Identifier':
                return this.visitIdentifier(node);
            case 'VariableDeclaration':
                return this.visitVariableDeclaration(node);
            case 'VariableDeclarator':
                return this.visitVariableDeclarator(node);
            case 'CallExpression':
                return this.visitCallExpression(node);
            case 'ExpressionStatement':
                return this.visitExpressionStatement(node);
            case 'MemberExpression':
                return this.visitMemberExpression(node);
            case 'BinaryExpression':
                return this.visitBinaryExpression(node);
            case 'AssignmentExpression':
                return this.visitAssignmentExpression(node);
            case 'ArrayExpression':
                return this.visitArrayExpression(node);
            case 'ObjectExpression':
                return this.visitObjectExpression(node);
            case 'Property':
                return this.visitProperty(node);
        }
    }

    visitProperty(node) {
        const key = this.visitNode(node.key);
        const value = this.visitNode(node.value);
        return {key: key, value: value};
    }

    visitObjectExpression(node) {
        const object = {};
        node.properties.forEach(property => {
            const prop = this.visitNode(property);
            object[prop.key] = prop.value;
        });
        return object;
    }

    visitArrayExpression(node) {
        const array = node.elements.map(element => this.visitNode(element));
        return array;
    }

    visitAssignmentExpression(node) {
        const assignmentVariable = this.globalScope.find(variable => variable.id === node.left.name)
        const operator = node.operator;
        const assignmentValue = this.visitNode(node.right);

        if (operator === '=') {
            assignmentVariable.value = assignmentValue;
        }
    }

    visitBinaryExpression(node) {
        const leftNode = this.visitNode(node.left);
        const operator = node.operator;
        const rightNode = this.visitNode(node.right);
        switch (operator) {
            case ops.ADD:
                return leftNode + rightNode;
            case ops.SUB:
                return leftNode - rightNode;
            case ops.DIV:
                return leftNode / rightNode;
            case ops.MUL:
                return leftNode * rightNode;
        }
    }

    visitMemberExpression(node) {
        return this.visitNode(node.object);
    }

    visitExpressionStatement(node) {
        return this.visitNode(node.expression);
    }

    visitLiteral(node) {
        return node.value;
    }

    visitIdentifier(node) {
        const name = node.name;
        const identifierFound = this.globalScope.find(variable => variable.id === name);

        if (identifierFound) {
            return identifierFound.value;
        } else {
            return name;
        }
    }

    visitVariableDeclaration(node) {
        return this.visitNodes(node.declarations)
    }

    visitVariableDeclarator(node) {
        const id = this.visitNode(node.id);
        const init = this.visitNode(node.init);
        this.globalScope.push({id: id, value: init});
        return init;
    }

    evalArgs(nodeArgs) {
        let g = []
        for (const nodeArg of nodeArgs) {
            g.push(this.visitNode(nodeArg))
        }
        return g
    }
    
    visitCallExpression(node) {

        const callee = this.visitNode(node.callee);
        const _arguments = this.evalArgs(node.arguments);

        if (['print', 'console'].includes(callee)) {
            console.log(..._arguments)
        }

    }

}