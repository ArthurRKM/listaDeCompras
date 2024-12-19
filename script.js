// Inicialização de produtos a partir do HTML
const initialProducts = [
    { name: "Baphomet", description: "Uma figura esotérica frequentemente associada ao ocultismo, simbolizando dualidade e equilíbrio entre opostos.", image: "Baphomet.png" },
    { name: "Asmodeus", description: "Demonio ligado à luxúria e à avareza, muitas vezes associado a práticas de sedução e destruição de lares.", image: "Asmodeus.jpg" },
    { name: "Belzebu", description: "Demonologia retrata como o Senhor das Moscas, um príncipe dos demônios que representa a decadência e a corrupção.", image: "Beelzebub.png" }
];

// Função para inicializar os produtos se não existirem no localStorage
function initializeProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    if (products.length === 0) {
        localStorage.setItem('products', JSON.stringify([]));
    }
}

// Função para adicionar um novo produto
function addProduct() {
    const productInput = document.getElementById('productInput');
    const productName = productInput.value.trim();

    if (productName) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name: productName, description: "Descrição padrão", image: "padrao.png" });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        productInput.value = '';
    }
}

// Função para exibir produtos
function displayProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Limpa a lista antes de exibir novamente
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Adiciona produtos pré-cadastrados do HTML
    initialProducts.forEach((product, index) => {
        const li = createProductElement(product, index);
        productList.appendChild(li);
    });

    // Adiciona novos produtos armazenados no localStorage
    products.forEach((product, index) => {
        const li = createProductElement(product, initialProducts.length + index, true);
        productList.appendChild(li);
    });
}

// Função para criar um elemento de produto
function createProductElement(product, index, isNew = false) {
    const li = document.createElement('li');

    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.style.width = '50px';

    const productDetails = document.createElement('div');
    productDetails.innerHTML = `<strong>${product.name}</strong><br><span class="demonic-description">${product.description}</span>`; // Adicionando a classe

    li.appendChild(productImage);
    li.appendChild(productDetails);

    // Botão de editar descrição
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar Descrição';
    editBtn.className = 'edit-btn';
    editBtn.onclick = () => editProduct(index);
    li.appendChild(editBtn);

    // Se for um produto novo, adiciona os botões de mudar imagem e remover
    if (isNew) {
        const changeImageBtn = document.createElement('button');
        changeImageBtn.textContent = 'Mudar Imagem';
        changeImageBtn.className = 'change-image-btn';
        changeImageBtn.onclick = () => changeImage(index);
        li.appendChild(changeImageBtn);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removeProduct(index);
        li.appendChild(removeBtn);
    } else {
        const fixedImageBtn = document.createElement('button');
        fixedImageBtn.textContent = 'Imagem Fixa';
        fixedImageBtn.disabled = true;
        li.appendChild(fixedImageBtn);
    }

    return li;
}

// Função para editar a descrição
function editProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newDescription = prompt("Digite a nova descrição:", index < initialProducts.length ? initialProducts[index].description : products[index - initialProducts.length].description);
    
    if (newDescription !== null) {
        if (index < initialProducts.length) {
            // Para produtos iniciais, só atualiza a descrição
            initialProducts[index].description = newDescription;
        } else {
            // Para produtos adicionados
            products[index - initialProducts.length].description = newDescription;
        }
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// Função para mudar a imagem
function changeImage(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const newImageUrl = prompt("Digite a nova URL da imagem:", products[index - initialProducts.length].image);
    
    if (newImageUrl !== null) {
        products[index - initialProducts.length].image = newImageUrl;
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
    }
}

// Função para remover um produto
function removeProduct(index) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.splice(index - initialProducts.length, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Adiciona evento ao botão de adicionar
document.getElementById('addProductBtn').addEventListener('click', addProduct);

// Carrega os produtos ao inicializar a página
window.onload = () => {
    initializeProducts();
    displayProducts();
};
