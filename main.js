let productos = []


async function cargarProductos() {
    try {
        const response = await fetch('./db/data.json')
        if (!response.ok) throw new Error("Error al cargar productos")
        productos = await response.json()
        renderProductos(productos)
    } catch (error) {
        console.error(error)
        Swal.fire('Error', 'No se pudieron cargar los productos', 'error')
    }
}

function renderProductos(listaProductos) {
    const contenedorProductos = document.querySelector(".productos-js")
    contenedorProductos.innerHTML = ""
    listaProductos.forEach((producto) => {
        const card = document.createElement("div")
        card.classList.add("producto")
        card.innerHTML = `<img src="${producto.imagen}" alt="Imagen de ${producto.nombre}" />
                          <h3>${producto.nombre}</h3>
                          <p>$${producto.precio}</p>
                          <button class="productoAgregar" data-id="${producto.id}">Agregar</button>`
        contenedorProductos.appendChild(card)
    })
    addToCartButton()
}

function addToCartButton() {
    const botonesAgregar = document.querySelectorAll(".productoAgregar")
    botonesAgregar.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.dataset.id)
            const selectedProduct = productos.find(producto => producto.id === productId)
            const productoEnCarrito = carrito.find(item => item.id === productId)
            if (productoEnCarrito) {
                productoEnCarrito.cantidad += 1
            } else {
                selectedProduct.cantidad = 1
                carrito.push(selectedProduct)
            }
            guardarCarrito()
            renderCarrito(carrito)
            Swal.fire({
                title: '¡Producto agregado!',
                text: `${selectedProduct.nombre} se cargo en el carrito.`,
                icon: 'success',
                timer: 1000,
                showConfirmButton: false
            })
        }
    })
}

document.getElementById("busqueda").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm)
    )
    renderProductos(productosFiltrados)
})

document.getElementById("ordenar").addEventListener("change", (e) => {
    const sortBy = e.target.value
    let productosOrdenados
    if (sortBy === "precio") {
        productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio)
    } else if (sortBy === "nombre") {
        productosOrdenados = [...productos].sort((a, b) =>
            a.nombre.localeCompare(b.nombre, undefined, { sensitivity: 'base' })
        )
    } else {
        productosOrdenados = productos
    }
    renderProductos(productosOrdenados)
})

function guardarCarrito() {
    localStorage.setItem("carritoproductos", JSON.stringify(carrito))
}

cargarProductos()
