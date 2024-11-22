const API_BASE_URL = 'http://localhost:3000/api/tree';

// Función para manejar la respuesta del servidor y mostrarla gráficamente
const displayOutput = (data) => {
  const outputContent = document.getElementById('outputContent');
  outputContent.textContent = JSON.stringify(data, null, 2);

  // Llamamos a la función para visualizar el árbol
  if (data.tree) {
    renderTree(data.tree);
  }
};

// Función para añadir un nodo
document.getElementById('addNodeForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const value = document.getElementById('addValue').value;

  try {
    const response = await fetch(`${API_BASE_URL}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: Number(value) }),
    });
    const result = await response.json();
    displayOutput(result);
  } catch (error) {
    displayOutput({ error: 'Error al añadir nodo', details: error });
  }
});

// Función para eliminar un nodo
document.getElementById('deleteNodeForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const value = document.getElementById('deleteValue').value;

  try {
    const response = await fetch(`${API_BASE_URL}/delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: Number(value) }),
    });
    const result = await response.json();
    displayOutput(result);
  } catch (error) {
    displayOutput({ error: 'Error al eliminar nodo', details: error });
  }
});

// Función para consultar el árbol en diferentes órdenes
const fetchOrder = async (orderType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${orderType}`);
    const data = await response.json();
    displayOutput(data);
  } catch (error) {
    displayOutput({ error: 'Error al consultar el árbol', details: error });
  }
};

// Función para renderizar el árbol binario
const renderTree = (tree) => {
  const container = document.getElementById('treeContainer');
  container.innerHTML = `<pre>${JSON.stringify(tree, null, 2)}</pre>`;
};
