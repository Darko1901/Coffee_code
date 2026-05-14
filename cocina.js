const productoscocina = [
    {
        id: 1,
        nombre: "Enchiladas verdes",
        precio: 25.99,
    },
    {
        id: 2,
        nombre: "Chile relleno",
        precio: 45.50
    },
    {
        id: 3,
        nombre: "Hamburguesa clasica",
        precio: 65.00
    },
    {
        id: 4,
        nombre: "Tacos dorados",
        precio: 20.99
    },
    {
        id: 5,
        nombre: "Guajalote",
        precio: 48.50
    }
];


function imprimirProductos() {
    console.log("PRODUCTOS DE COCINA");
    productoscocina.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre}`);
        console.log(`   ID: ${producto.id}`);
        console.log(`   Precio: $${producto.precio}`);
        console.log("---");
    });
}


imprimirProductos();
