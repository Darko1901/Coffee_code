let productoscocina = [
    { id: 1, nombre: "Enchiladas verdes",  precio: 25.99, tipo: "comida" },
    { id: 2, nombre: "Chile relleno",       precio: 45.50, tipo: "comida" },
    { id: 3, nombre: "Hamburguesa clasica", precio: 65.00, tipo: "comida" },
    { id: 4, nombre: "Tacos dorados",       precio: 20.99, tipo: "comida" },
    { id: 5, nombre: "Guajalote",           precio: 48.50, tipo: "comida" },
    { id: 6, nombre: "Napolitano",precio: 38.50, tipo: "postre" },
    { id: 7, nombre: "Carlotta de limon",precio: 47, tipo: "postre" },
    { id: 8, nombre: "CheessCake",precio: 70.50, tipo: "postre" },
    { id: 9, nombre: "Limonada",precio: 58.50, tipo: "bebida" },
    { id: 10, nombre: "coca Sin Azucar",precio: 68.50, tipo: "bebida" },
];

// Limpiar localStorage para resetear
localStorage.removeItem("productoscocina");


const guardados = localStorage.getItem("productoscocina");
if (guardados) {
    productoscocina = JSON.parse(guardados);
}


function guardarStorage() {
    localStorage.setItem("productoscocina", JSON.stringify(productoscocina));
}


function agregar() {
    const nombre = document.getElementById("nombre").value;
    const precio = parseFloat(document.getElementById("precio").value);

    if (!nombre || !precio) return;

    const nuevoId = Math.max(...productoscocina.map(p => p.id)) + 1;
    productoscocina.push({ id: nuevoId, nombre, precio, tipo: "comida" });
    guardarStorage();

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

function listar() {
    let html = "";
    productoscocina.forEach(p => {
        html += "<p>ID: " + p.id + " | " + p.nombre + " | $" + p.precio + "</p>";
    });
    document.getElementById("lista").innerHTML = html;
}

function buscar() {
    const id = parseInt(document.getElementById("buscaId").value);
    const producto = productoscocina.find(p => p.id === id);

    if (producto) {
        document.getElementById("resultado").innerHTML =
            "<p>" + producto.nombre + " - $" + producto.precio + "</p>";
    } else {
        document.getElementById("resultado").innerHTML = "<p>No encontrado</p>";
    }
}

function buscarFilterBaratos() {
    const baratos = productoscocina.filter(p => p.precio < 50);
    let html = "";
    
    baratos.forEach(p => {
        html += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${p.nombre}</span>
                    <span class="producto-id">ID: ${p.id}</span>
                </div>
                <span class="producto-precio">$${p.precio.toFixed(2)}</span>
            </div>
        `;
    });
    
    document.getElementById("lista").innerHTML = html || "<p>Sin resultados</p>";
}

function buscarFilterCaros() {
    const caros = productoscocina.filter(p => p.precio >= 50);
    let html = "";
    
    caros.forEach(p => {
        html += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${p.nombre}</span>
                    <span class="producto-id">ID: ${p.id}</span>
                </div>
                <span class="producto-precio">$${p.precio.toFixed(2)}</span>
            </div>
        `;
    });
    
    document.getElementById("lista").innerHTML = html || "<p>Sin resultados</p>";
}

function buscarFilterPorTipo() {
    const tipo = document.getElementById("filtroTipo").value;
    console.log("Tipo seleccionado:", tipo);
    console.log("Productos disponibles:", productoscocina);
    
    const porTipo = productoscocina.filter(p => p.tipo === tipo);
    console.log("Productos filtrados:", porTipo);
    
    let html = "";
    
    porTipo.forEach(p => {
        html += `
            <div class="producto-item">
                <div class="producto-info">
                    <span class="producto-nombre">${p.nombre}</span>
                    <span class="producto-id">ID: ${p.id}</span>
                </div>
                <span class="producto-precio">$${p.precio.toFixed(2)}</span>
            </div>
        `;
    });
    
    document.getElementById("lista").innerHTML = html || "<p>Selecciona un tipo</p>";
}


function actualizar() {
    const id = parseInt(document.getElementById("updateId").value);
    const nuevoPrecio = parseFloat(document.getElementById("updatePrecio").value);

    const producto = productoscocina.find(p => p.id === id);
    if (producto) {
        producto.precio = nuevoPrecio;
        guardarStorage();
        document.getElementById("updateId").value = "";
        document.getElementById("updatePrecio").value = "";
    }
}

function eliminar() {
    const id = parseInt(document.getElementById("deleteId").value);
    const index = productoscocina.findIndex(p => p.id === id);

    if (index !== -1) {
        productoscocina.splice(index, 1);
        guardarStorage();
        document.getElementById("deleteId").value = "";
    }
}
