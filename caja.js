let pedidos = [];
let total = 0;

// Poblar el select con productos de cocina.js
window.onload = function () {
    const select = document.getElementById("selector-producto");
    for (let i = 0; i < productoscocina.length; i++) {
        select.innerHTML += `<option value="${productoscocina[i].id}">${productoscocina[i].nombre} - $${productoscocina[i].precio}</option>`;
    }
};

// Agregar producto seleccionado al pedido
function agregarPedido() {
    const opcion = parseInt(document.getElementById("selector-producto").value);
    const producto = productoscocina.find(p => p.id === opcion);

    if (producto) {
        pedidos.push(producto);
        console.log("Pedido agregado:", producto.nombre);
        actualizarVista();
    }
}

// Actualizar tarjetas y total
function actualizarVista() {
    const cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML = "";
    total = 0;

    for (let i = 0; i < pedidos.length; i++) {
        total = total + pedidos[i].precio;
        cuerpo.innerHTML += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${pedidos[i].nombre}</span>
                    <span class="producto-id">ID: ${pedidos[i].id}</span>
                </div>
                <span class="producto-precio">$${pedidos[i].precio.toFixed(2)}</span>
            </div>
        `;
    }

    console.log("Total del pedido: $" + total.toFixed(2));
    document.getElementById("total").textContent = "$" + total.toFixed(2);
}
