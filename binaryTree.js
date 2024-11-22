class TreeNode {
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
  
    generateTree(levels = 3) {
      if (levels < 1) return null;
      this.root = this._generateSubTree(1, levels);
    }
  
    _generateSubTree(currentLevel, maxLevel) {
      if (currentLevel > maxLevel) return null;
  
      const node = new TreeNode(Math.floor(Math.random() * 100));
      node.left = this._generateSubTree(currentLevel + 1, maxLevel);
      node.right = this._generateSubTree(currentLevel + 1, maxLevel);
      return node;
    }
  
    inOrder(node = this.root, result = []) {
      if (node) {
        this.inOrder(node.left, result);
        result.push(node.value);
        this.inOrder(node.right, result);
      }
      return result;
    }
  
    preOrder(node = this.root, result = []) {
      if (node) {
        result.push(node.value);
        this.preOrder(node.left, result);
        this.preOrder(node.right, result);
      }
      return result;
    }
  
    postOrder(node = this.root, result = []) {
      if (node) {
        this.postOrder(node.left, result);
        this.postOrder(node.right, result);
        result.push(node.value);
      }
      return result;
    }
  
    levelOrder() {
      const result = [];
      const queue = [this.root];
  
      while (queue.length > 0) {
        const node = queue.shift();
        if (node) {
          result.push(node.value);
          queue.push(node.left);
          queue.push(node.right);
        }
      }
  
      return result;
    }
  
    addNode(value) {
      const newNode = new TreeNode(value);
      if (!this.root) {
        this.root = newNode;
        return;
      }
  
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            break;
          }
          current = current.left;
        } else {
          if (!current.right) {
            current.right = newNode;
            break;
          }
          current = current.right;
        }
      }
    }
  
    removeNode(value) {
      this.root = this._removeNodeRecursively(this.root, value);
    }
  
    _removeNodeRecursively(node, value) {
      if (!node) return null;
  
      if (value < node.value) {
        node.left = this._removeNodeRecursively(node.left, value);
      } else if (value > node.value) {
        node.right = this._removeNodeRecursively(node.right, value);
      } else {
        // Caso 1: Nodo sin hijos
        if (!node.left && !node.right) return null;
  
        // Caso 2: Nodo con un hijo
        if (!node.left) return node.right;
        if (!node.right) return node.left;
  
        // Caso 3: Nodo con dos hijos
        const minValue = this._findMinValue(node.right);
        node.value = minValue;
        node.right = this._removeNodeRecursively(node.right, minValue);
      }
  
      return node;
    }
  
    _findMinValue(node) {
      while (node.left) {
        node = node.left;
      }
      return node.value;
    }
  }
  
  module.exports = BinaryTree;
  