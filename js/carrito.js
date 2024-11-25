let carrito = JSON.parse(localStorage.getItem("carritoproductos")) || [];
const contenedorCarrito = document.querySelector(".carrito-js");

// Función para renderizar el carrito
function renderCarrito(cartItems) {
    contenedorCarrito.innerHTML = '';
    if (cartItems.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    } else {
        let total = 0;
        cartItems.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad;
            total += subtotal;

            const card = document.createElement("div");
            card.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <p>Cantidad: 
                    <button class="cantidad-btn" id="minus-${producto.id}">-</button>
                    ${producto.cantidad}
                    <button class="cantidad-btn" id="plus-${producto.id}">+</button>
                </p>
                <p>Subtotal: $${subtotal}</p>
                <button class="eliminar" data-id="${producto.id}">Eliminar</button>`;
            contenedorCarrito.appendChild(card);
        });

        const totalCard = document.createElement("div");
        totalCard.innerHTML = `<h3>Total: $${total}</h3>`;
        contenedorCarrito.appendChild(totalCard);

        addEliminarEvent();
        addQuantityEvents();
    }
}

// Función para agregar eventos a los botones de cantidad
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
            actualizarCarrito();
        };
    });
}

// Función para agregar el evento de eliminar producto
function addEliminarEvent() {
    document.querySelectorAll(".eliminar").forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.dataset.id);
            carrito = carrito.filter(item => item.id !== productId);
            actualizarCarrito();
        };
    });
}

// Función para guardar el carrito
function actualizarCarrito() {
    localStorage.setItem("carritoproductos", JSON.stringify(carrito)); // Guarda el carrito actualizado en localStorage
    renderCarrito(carrito);
}

// Vaciar el carrito
document.getElementById("vaciar-carrito-js").addEventListener("click", () => {
    if (carrito.length === 0) {
        // Si el carrito está vacío, mostramos una alerta.
        Swal.fire('Carrito vacío', 'Tu carrito ya está vacío.', 'info');
    } else {
        // Si el carrito no está vacío, confirmamos el vaciado.
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esto vaciará tu carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                actualizarCarrito();
                Swal.fire('¡Listo!', 'El carrito se ha vaciado.', 'success');
            }
        });
    }
});


// Procesar el checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agrega productos antes de proceder con la compra.', 'info');
    } else {
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'Tu pedido se procesará pronto.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
        carrito = [];
        actualizarCarrito();
    }
});

// Inicializar el carrito
renderCarrito(carrito);
