let carrito = JSON.parse(localStorage.getItem("carritoproductos")) || []
const contenedorCarrito = document.querySelector(".carrito-js")


function renderCarrito(cartItems) {
    contenedorCarrito.innerHTML = ''
    if (cartItems.length === 0) {
        contenedorCarrito.innerHTML = "<p>El carrito esta vacío</p>"
    } else {
        let total = 0
        cartItems.forEach(producto => {
            const subtotal = producto.precio * producto.cantidad
            total += subtotal

            const card = document.createElement("div")
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <p>Precio: $${producto.precio}</p>
                              <p>Cantidad: 
                              <button class="cantidad-btn" id="minus-${producto.id}">-</button>
                              ${producto.cantidad}
                              <button class="cantidad-btn" id="plus-${producto.id}">+</button>
                              </p>
                              <p>Subtotal: $${subtotal}</p>
                              <button class="eliminar" data-id="${producto.id}">Eliminar</button>`
            contenedorCarrito.appendChild(card)
        })

        const totalCard = document.createElement("div")
        totalCard.innerHTML = `<h3>Total: $${total}</h3>`
        contenedorCarrito.appendChild(totalCard)
    }
    addEliminarEvent()
    AddCantEvent()
}

function AddCantEvent() {
    document.querySelectorAll(".cantidad-btn").forEach(button => {
        button.onclick = (e) => {
            const productoId = parseInt(e.currentTarget.id.split('-')[1])
            const producto = carrito.find(item => item.id === productoId)
            if (e.currentTarget.id.includes('minus') && producto.cantidad > 1) { 
                producto.cantidad--
            } else if (e.currentTarget.id.includes('plus')) {
                producto.cantidad++
            }
            actualizarCarrito()
        }
    })
}


function addEliminarEvent() {
    document.querySelectorAll(".eliminar").forEach(button => {
        button.onclick = (e) => {
            const productoId = parseInt(e.currentTarget.dataset.id)
            carrito = carrito.filter(item => item.id !== productoId)
            actualizarCarrito()
        }
    })
}


function actualizarCarrito() {
    localStorage.setItem("carritoproductos", JSON.stringify(carrito)) 
    renderCarrito(carrito)
}


document.getElementById("vaciar-carrito-js").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Tu carrito ya esta vacío.', 'info')
    } else {
        Swal.fire({
            title: '¿Estas seguro?',
            text: 'Se eliminara todo del carrito.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, vaciar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = []
                actualizarCarrito()
                Swal.fire('¡Listo!', 'El carrito se ha vaciado.', 'success')
            }
        })
    }
})


document.getElementById("comprar").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agrega productos antes de la compra.', 'info')
    } else {
        Swal.fire({
            title: '¡Gracias por tu compra!',
            text: 'Tu pedido esta en camino.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        })
        carrito = []
        actualizarCarrito()
    }
})


renderCarrito(carrito)
