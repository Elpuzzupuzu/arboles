const express = require('express');
const cors = require('cors');
const BinaryTree = require('./binaryTree');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // Middleware para manejar JSON en requests

const binaryTree = new BinaryTree();
binaryTree.generateTree(); // Genera un árbol de nivel 3 al iniciar

// Endpoints existentes
app.get('/api/tree/inorder', (req, res) => {
  res.json({ order: 'in-order', values: binaryTree.inOrder() });
});

app.get('/api/tree/preorder', (req, res) => {
  res.json({ order: 'pre-order', values: binaryTree.preOrder() });
});

app.get('/api/tree/postorder', (req, res) => {
  res.json({ order: 'post-order', values: binaryTree.postOrder() });
});

app.get('/api/tree/levelorder', (req, res) => {
  res.json({ order: 'level-order', values: binaryTree.levelOrder() });
});

// Nuevo endpoint: Añadir nodo
app.post('/api/tree/add', (req, res) => {
  const { value } = req.body;

  if (typeof value !== 'number') {
    return res.status(400).json({ error: 'El valor debe ser un número' });
  }

  binaryTree.addNode(value);
  res.json({ message: `Nodo con valor ${value} añadido`, tree: binaryTree.root });
});

// Nuevo endpoint: Eliminar nodo
app.delete('/api/tree/delete', (req, res) => {
  const { value } = req.body;

  if (typeof value !== 'number') {
    return res.status(400).json({ error: 'El valor debe ser un número' });
  }

  binaryTree.removeNode(value);
  res.json({ message: `Nodo con valor ${value} eliminado`, tree: binaryTree.root });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
