const productos = [
    { id: 1, nombre: "Cafe Espresso", precio: 950, descripcion: "Café intenso y aromático, preparado con granos de calidad. Ideal para un impulso rápido.", imagen: "./img/cafeespresso.png" },
    { id: 2, nombre: "Cafe con leche", precio: 1050, descripcion: "Un clásico irresistible, mezcla de café premium y leche espumada.", imagen: "./img/cafeleche.png" },
    { id: 3, nombre: "Cappuccino", precio: 1100, descripcion: "Un delicioso cappuccino elaborado con un espresso de alta calidad, leche vaporizada y una generosa capa de espuma de leche. Aromatizado con un toque de canela o chocolate en polvo.", imagen: "./img/capu.png" },
    { id: 4, nombre: "Latte de Caramelo Cremoso", precio: 1250, descripcion: "Doble shot de espresso con leche cremosa. Perfecta armonía para el gusto exigente.", imagen: "./img/latte.png" },
    { id: 5, nombre: "Flat White Premium", precio: 1250, descripcion: "Café suave con un toque dulce de caramelo y leche espumosa que acaricia el paladar.", imagen: "./img/white.png" },
    { id: 6, nombre: "Mocha de Chocolate Amargo", precio: 1350, descripcion: "Café y cacao oscuro se unen en una bebida indulgente y sofisticada.", imagen: "./img/moca.png" },
    { id: 7, nombre: "Affogato de Vainilla", precio: 1375, descripcion: "Helado de vainilla sumergido en espresso caliente, un postre y café en uno.", imagen: "./img/afogato.png" },
    { id: 8, nombre: "Cold Brew Exótico", precio: 1280, descripcion: "Café frío, infusionado lentamente para un sabor refrescante y único.", imagen: "./img/cold.png" }
];

// Renderizar productos en la página
function renderProductos(p) {
    const contenedorproductos = document.querySelector(".productos-js");
    contenedorproductos.innerHTML = '';
    if (p.length === 0) {
        contenedorproductos.innerHTML = "<p>No se encontró su producto. Algunas sugerencias:</p>";
    } else {
        p.forEach(producto => {
            const card = document.createElement("div");
            card.innerHTML = `<h3>${producto.nombre}</h3>
                              <img src="${producto.imagen}" alt="${producto.nombre}" />
                              <p>$${producto.precio}</p>
                              <button class="productoAgregar" id="${producto.id}">Agregar</button>
                              <button class="productoAgregar" id="eliminar-${producto.id}">Eliminar</button>`;
            contenedorproductos.appendChild(card);
        });
        addToCartButton();
    }
}

// Agregar al carrito
function addToCartButton() {
    const addboton = document.querySelectorAll(".productoAgregar");
    addboton.forEach(button => {
        button.onclick = (e) => {
            const productId = parseInt(e.currentTarget.id);
            const selectedproduct = productos.find(producto => producto.id === productId);
            const productoencarrito = carrito.find(item => item.id === productId);
            if (productoencarrito) {
                productoencarrito.cantidad += 1;
            } else {
                selectedproduct.cantidad = 1;
                carrito.push(selectedproduct);
            }
            localStorage.setItem("carritoproductos", JSON.stringify(carrito));
            renderCarrito(carrito);  // Asegúrate de que renderCarrito esté en carrito.js
            renderProductos(productos);  // Para actualizar la vista
            updateMiniCarrito();
        };
    });
}

// Búsqueda avanzada de productos
document.getElementById("busqueda").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm)
    );
    renderProductos(filteredProductos);
});

// Ordenar productos
document.getElementById("ordenar").addEventListener("change", (e) => {
    const sortBy = e.target.value;
    let sortedProductos;
    if (sortBy === "precio") {
        sortedProductos = [...productos].sort((a, b) => a.precio - b.precio);
    } else if (sortBy === "popularidad") {
        // Aquí se puede implementar un criterio de popularidad
        sortedProductos = productos;
    } else if (sortBy === "novedades") {
        // Aquí se puede implementar un criterio de novedades
        sortedProductos = productos;
    } else {
        sortedProductos = productos;
    }
    renderProductos(sortedProductos);
});

// Llamar la función para inicializar los productos
renderProductos(productos);
