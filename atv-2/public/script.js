const apiUrl = 'http://localhost:3000/api/items';

async function carregarProdutos() {
    const response = await fetch(apiUrl);
    const produtos = await response.json();
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
    
    produtos.forEach(produto => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${produto.nome} - R$ ${produto.valor.toFixed(2)}</span>
            <div>
                <button class="btn-editar" onclick="editarProduto('${produto._id}', '${produto.nome}', ${produto.valor})">Editar</button>
                <button class="btn-excluir" onclick="excluirProduto('${produto._id}')">Excluir</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

async function salvarProduto() {
    const id = document.getElementById('itemId').value;
    const nome = document.getElementById('nomeProduto').value;
    const valor = document.getElementById('valorProduto').value;

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `${apiUrl}/${id}` : apiUrl;

    await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, valor: parseFloat(valor) })
    });

    document.getElementById('itemId').value = '';
    document.getElementById('nomeProduto').value = '';
    document.getElementById('valorProduto').value = '';
    document.getElementById('btnAdicionar').innerText = 'Adicionar Produto';
    
    carregarProdutos();
}

function editarProduto(id, nome, valor) {
    document.getElementById('itemId').value = id;
    document.getElementById('nomeProduto').value = nome;
    document.getElementById('valorProduto').value = valor;
    document.getElementById('btnAdicionar').innerText = 'Atualizar Produto';
}

async function excluirProduto(id) {
    if(confirm('Tem certeza que deseja excluir?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        carregarProdutos();
    }
}

carregarProdutos();