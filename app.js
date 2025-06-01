const APP_ID = '838153F5-475C-4C44-A023-B00D51E2B063';
const API_KEY = '22E2AA4B-15AD-420B-819A-D1980A3DA9DC';
const BASE_URL = `https://api.backendless.com/${APP_ID}/${API_KEY}`;
const USERS_ENDPOINT = `${BASE_URL}/users`;
const DATA_ENDPOINT = `${BASE_URL}/data/Products`;

document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('register-form').addEventListener('submit', registerUser);
document.getElementById('product-form').addEventListener('submit', addProduct);

function registerUser(event) {
    event.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    fetch(`${USERS_ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            alert('User registered successfully');
            document.getElementById('register-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error registrando usuario');
        });
}

function loginUser(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch(`${USERS_ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login: email, password })
    })
        .then(response => response.json())
        .then(data => {
            alert('User logged in successfully');
            document.getElementById('auth-container').style.display = 'none';
            document.getElementById('crud-container').style.display = 'block';
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de inicio de sesion');
        });
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = document.getElementById('product-price').value;

    fetch(DATA_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, price })
    })
        .then(response => response.json())
        .then(data => {
            alert('Producto agregado');
            fetchProducts();
            document.getElementById('product-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error agregando producto');
        });
}

function fetchProducts() {
    fetch(DATA_ENDPOINT, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = '';
            data.forEach(product => {
                const productItem = document.createElement('div');
                productItem.className = 'product-item';
                productItem.innerHTML = `
                    <p>Name: ${product.name}</p>
                    <p>Price: ${product.price}</p>
                    <button onclick="deleteProduct('${product.objectId}')">Delete</button>
                `;
                productList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error obteniendo productos');
        });
}

function deleteProduct(productId) {
    fetch(`${DATA_ENDPOINT}/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            alert('Producto borrado con éxito');
            fetchProducts();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error borrando producto');
        });
}