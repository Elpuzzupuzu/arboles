const API_BASE_URL = 'http://localhost:3000';

async function fetchTraversal(type) {
    try {
        const response = await fetch(`${API_BASE_URL}/${type}`);
        const traversal = await response.json();

        displayTraversalResult(type, traversal);
        visualizeTree(traversal);
    } catch (error) {
        console.error('Error fetching traversal:', error);
    }
}

function displayTraversalResult(type, traversal) {
    const resultDiv = document.getElementById('traversal-result');
    resultDiv.innerHTML = `
        <h3>Recorrido (${type}):</h3>
        <p>${traversal.join(' → ')}</p>
    `;
}

function visualizeTree(traversal) {
    const treeContainer = document.getElementById('tree-container');
    treeContainer.innerHTML = ''; // Limpiar el contenedor

    // Construir la estructura visual del árbol
    if (traversal.length === 0) {
        treeContainer.innerHTML = '<p>El árbol está vacío.</p>';
        return;
    }

    const createNode = (value) => {
        const node = document.createElement('div');
        node.classList.add('node');
        node.innerHTML = `<span>${value}</span>`;
        return node;
    };

    // Crear visualización jerárquica
    const levels = [];
    let level = 0;
    let currentLevelNodes = 1;

    while (traversal.length > 0) {
        levels[level] = traversal.splice(0, currentLevelNodes);
        currentLevelNodes *= 2; // Siguiente nivel tiene el doble de nodos
        level++;
    }

    levels.forEach((levelNodes) => {
        const levelDiv = document.createElement('div');
        levelDiv.classList.add('level');
        levelNodes.forEach((value) => {
            levelDiv.appendChild(createNode(value));
        });
        treeContainer.appendChild(levelDiv);
    });
}
