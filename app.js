const express = require('express');
const cors = require('cors'); // Importa cors
const BinaryTree = require('./binaryTree');

const app = express();
const tree = new BinaryTree();

app.use(express.json());
app.use(cors()); // Habilita CORS para todas las rutas

// Rutas
app.post('/insert', (req, res) => {
    const { value } = req.body;
    tree.insert(value);
    res.send(`Inserted value ${value}`);
});

app.get('/search/:value', (req, res) => {
    const { value } = req.params;
    const found = tree.search(Number(value));
    res.send({ found });
});

app.delete('/delete/:value', (req, res) => {
    const { value } = req.params;
    tree.delete(Number(value));
    res.send(`Deleted value ${value}`);
});

app.get('/breadth', (req, res) => {
    res.send(tree.breadthFirstTraversal());
});

app.get('/preorder', (req, res) => {
    res.send(tree.preOrderTraversal());
});

app.get('/inorder', (req, res) => {
    res.send(tree.inOrderTraversal());
});

app.get('/postorder', (req, res) => {
    res.send(tree.postOrderTraversal());
});

app.get('/levels', (req, res) => {
    res.send({ levels: tree.getLevels() });
});

app.get('/level/:value', (req, res) => {
    const { value } = req.params;
    const level = tree.getNodeLevel(Number(value));
    res.send({ level });
});

// Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
