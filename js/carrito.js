let carrito = JSON.parse(localStorage.getItem("carritoproductos")) || [];
const cantidadCarrito = document.getElementById("cantidad-carrito");
const carritocontenedor = document.querySelector(".carrito-js");

// Mostrar mini carrito
function updateMiniCarrito() {
    cantidadCarrito.innerText = carrito.reduce((total, item) => total + item.cantidad, 0);
}

// Renderizar carrito
function renderCarrito(cartItems) {
    carritocontenedor.innerHTML = '';
    if (cartItems.length === 0) {
        carritocontenedor.innerHTML = "<p>El carrito está vacío</p>";
    } else {
        let total = 0;
        cartItems.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const card = document.createElement("div");
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <p>Precio: $${producto.precio}</p>
                              <p>Cantidad: <button class="cantidad-btn" id="minus-${producto.id}">-</button>${producto.cantidad}<button class="cantidad-btn" id="plus-${producto.id}">+</button></p>
                              <p>Subtotal: $${subtotal}</p>
                              <button class="eliminar" data-id="${producto.id}">Eliminar</button>`;
            carritocontenedor.appendChild(card);
        });

        const TotalCard = document.createElement("div");
        TotalCard.innerHTML = `<h3>Total: $${total}</h3>`;
        carritocontenedor.appendChild(TotalCard);

        addEliminarEvent();
        addQuantityEvents();
    }
}

// Funcionalidad para los botones de cantidad
function addQuantityEvents() {
    document.querySelectorAll(".cantidad-btn").forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id.split('-')[1]);
            const product = carrito.find(item => item.id === productId);

            if (e.currentTarget.id.includes('minus') && product.cantidad > 1) {
                product.cantidad--;
            } else if (e.currentTarget.id.includes('plus')) {
                product.cantidad++;
            }
            localStorage.setItem("carritoproductos", JSON.stringify(carrito));
            renderCarrito(carrito);
        };
    });
}

// Eliminar un producto del carrito
function addEliminarEvent() {
    const eliminarBotones = document.querySelectorAll(".eliminar");
    eliminarBotones.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            carrito = carrito.filter(item => item.id !== productId);
            localStorage.setItem("carritoproductos", JSON.stringify(carrito));
            renderCarrito(carrito);
        };
    });
}

// Vaciar el carrito
document.getElementById("vaciar-carrito-js").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carritoproductos", JSON.stringify(carrito));
    renderCarrito(carrito);
    updateMiniCarrito();
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de proceder.");
    } else {
        alert("¡Gracias por tu compra! El proceso de checkout no está implementado aún.");
    }
});

// Inicializar el carrito
renderCarrito(carrito);
