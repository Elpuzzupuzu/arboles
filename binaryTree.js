class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const newNode = new Node(value);
        if (!this.root) {
            this.root = newNode;
            return;
        }

        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();

            if (!current.left) {
                current.left = newNode;
                return;
            } else {
                queue.push(current.left);
            }

            if (!current.right) {
                current.right = newNode;
                return;
            } else {
                queue.push(current.right);
            }
        }
    }

    search(value) {
        if (!this.root) return false;

        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            if (current.value === value) return true;

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return false;
    }

    delete(value) {
        if (!this.root) return;

        let toDelete = null;
        const queue = [this.root];
        let deepestNode = null;

        while (queue.length) {
            const current = queue.shift();
            if (current.value === value) toDelete = current;
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
            deepestNode = current;
        }

        if (toDelete && deepestNode) {
            toDelete.value = deepestNode.value;
            this._deleteDeepest(deepestNode);
        }
    }

    _deleteDeepest(node) {
        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            if (current.left === node) {
                current.left = null;
                return;
            }
            if (current.right === node) {
                current.right = null;
                return;
            }
            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
    }

    breadthFirstTraversal() {
        const result = [];
        if (!this.root) return result;

        const queue = [this.root];
        while (queue.length) {
            const current = queue.shift();
            result.push(current.value);

            if (current.left) queue.push(current.left);
            if (current.right) queue.push(current.right);
        }
        return result;
    }

    preOrderTraversal(node = this.root, result = []) {
        if (!node) return result;
        result.push(node.value);
        this.preOrderTraversal(node.left, result);
        this.preOrderTraversal(node.right, result);
        return result;
    }

    inOrderTraversal(node = this.root, result = []) {
        if (!node) return result;
        this.inOrderTraversal(node.left, result);
        result.push(node.value);
        this.inOrderTraversal(node.right, result);
        return result;
    }

    postOrderTraversal(node = this.root, result = []) {
        if (!node) return result;
        this.postOrderTraversal(node.left, result);
        this.postOrderTraversal(node.right, result);
        result.push(node.value);
        return result;
    }

    getLevels() {
        if (!this.root) return 0;

        const queue = [this.root];
        let levels = 0;

        while (queue.length) {
            const size = queue.length;
            levels++;
            for (let i = 0; i < size; i++) {
                const current = queue.shift();
                if (current.left) queue.push(current.left);
                if (current.right) queue.push(current.right);
            }
        }
        return levels;
    }

    getNodeLevel(value) {
        if (!this.root) return -1;

        const queue = [{ node: this.root, level: 1 }];
        while (queue.length) {
            const { node, level } = queue.shift();
            if (node.value === value) return level;

            if (node.left) queue.push({ node: node.left, level: level + 1 });
            if (node.right) queue.push({ node: node.right, level: level + 1 });
        }
        return -1;
    }
}

module.exports = BinaryTree;
