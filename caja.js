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
        const { nombre } = producto; // destructuring
        console.log("Pedido agregado:", nombre);
        actualizarVista();
    }
}

// Actualizar tarjetas y total
function actualizarVista() {
    const cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML = "";

    for (let i = 0; i < pedidos.length; i++) {
        const { id, nombre, precio } = pedidos[i]; // destructuring
        cuerpo.innerHTML += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${nombre}</span>
                    <span class="producto-id">ID: ${id}</span>
                </div>
                <span class="producto-precio">$${precio.toFixed(2)}</span>
            </div>
        `;
    }

    // reduce con destructuring para calcular subtotal
    const subtotal = pedidos.reduce((acumulado, { precio }) => acumulado + precio, 0);
    const iva = subtotal * 0.16;
    total = subtotal + iva;

    document.getElementById("subtotal").textContent = "$" + subtotal.toFixed(2);
    document.getElementById("iva").textContent      = "$" + iva.toFixed(2);
    document.getElementById("total").textContent    = "$" + total.toFixed(2);
}

// Callbacks de estado de pedido
const pedidoCallbacks = {
    recibido: [],
    preparando: [],
    empacando: [],
    entregando: [],
    cancelado: []
};

function onPedido(estado, cb) {
    if (!pedidoCallbacks.hasOwnProperty(estado)) {
        console.warn("Estado desconocido:", estado);
        return;
    }
    if (typeof cb !== 'function') return;
    pedidoCallbacks[estado].push(cb);
}

function triggerPedidoStatus(estado, detalle) {
    if (!pedidoCallbacks.hasOwnProperty(estado)) {
        console.warn("Estado desconocido:", estado);
        return;
    }
    pedidoCallbacks[estado].forEach(fn => {
        try { fn(detalle); } catch (e) { console.error('Callback error', e); }
    });
}

// Crear y enviar pedido: dispara 'recibido' y limpia la caja local
function enviarPedido() {
    if (pedidos.length === 0) { console.warn('No hay productos en el pedido'); return null; }
    const pedido = {
        id: Date.now(),
        items: pedidos.slice(),
        total
    };
    pedidos = [];
    actualizarVista();
    triggerPedidoStatus('recibido', pedido);
    return pedido;
}

// Simular progresion de estados (opcional): preparar -> empacar -> entregar
function simularProgreso(pedido, intervalMs = 2000) {
    setTimeout(() => triggerPedidoStatus('preparando', pedido), intervalMs);
    setTimeout(() => triggerPedidoStatus('empacando', pedido), intervalMs * 2);
    setTimeout(() => triggerPedidoStatus('entregando', pedido), intervalMs * 3);
}

function cancelarPedido(pedido) {
    triggerPedidoStatus('cancelado', pedido);
}

// Exponer API global para que otras partes puedan registrarse o disparar
window.pedidoOn = onPedido;
window.triggerPedidoStatus = triggerPedidoStatus;
window.enviarPedido = enviarPedido;
window.simularProgreso = simularProgreso;
window.cancelarPedido = cancelarPedido;
