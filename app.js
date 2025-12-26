let productos = [
    {
        id: 1,
        nombre: "Laptop HP",
        categoria: "Electrónica",
        precio: 650000,
        stock: 15,
        activo: true
    },
    {
        id: 2,
        nombre: "Mouse Logitech",
        categoria: "Accesorios",
        precio: 18500,
        stock: 50,
        activo: true
    },
    {
        id: 3,
        nombre: "Teclado Mecánico",
        categoria: "Accesorios",
        precio: 55000,
        stock: 30,
        activo: true
    },
    {
        id: 4,
        nombre: "Monitor Samsung 24\"",
        categoria: "Electrónica",
        precio: 135000,
        stock: 20,
        activo: true
    },
    {
        id: 5,
        nombre: "Webcam HD",
        categoria: "Accesorios",
        precio: 32000,
        stock: 0,
        activo: false
    }
];

function sumar(a, b) {
    return a + b;
}

function restar(a, b) {
    return a - b;
}

function multiplicar(a, b) {
    return a * b;
}

function dividir(a, b) {
    if (b === 0) {
        return "Error: No se puede dividir por cero";
    }
    return a / b;
}

function mostrarProductos() {
    console.clear();
    console.log("📦 === LISTA DE PRODUCTOS === 📦");

    if (productos.length === 0) {
        console.log("⚠️  No hay productos registrados");
        return;
    }

    productos.forEach((producto) => {
        console.log(`-------------`);
        console.log(`ID: ${producto.id}`);
        console.log(`Nombre: ${producto.nombre}`);
        console.log(`Categoría: ${producto.categoria}`);
        console.log(`Precio: $${producto.precio.toLocaleString('es-CL')} CLP`);
        console.log(`Stock: ${producto.stock} unidades`);
        console.log(`Estado: ${producto.activo ? '✅ Activo' : '❌ Inactivo'}`);
    });
    console.log("\n");
}

function agregarProducto() {
    console.log("➕ === AGREGAR NUEVO PRODUCTO === ➕");

    let nombre = prompt("Nombre del producto:");
    if (!nombre) return;

    let categoria = prompt("Categoría:");
    if (!categoria) return;

    let precioInput = prompt("Precio (CLP):");
    let precio = parseFloat(precioInput);

    let stockInput = prompt("Stock inicial:");
    let stock = parseInt(stockInput);

    if (isNaN(precio) || precio < 0 || isNaN(stock) || stock < 0) {
        alert("Error: Precio y stock deben ser números válidos mayores a 0");
        return;
    }

    let nuevoProducto = {
        id: productos.length + 1,
        nombre: nombre,
        categoria: categoria,
        precio: precio,
        stock: stock,
        activo: stock > 0
    };

    productos.push(nuevoProducto);
    console.log("✅ Producto agregado exitosamente:");
    console.log(nuevoProducto);
}

function buscarProducto() {
    console.log("🔍 === BUSCAR PRODUCTO === 🔍");

    let termino = prompt("Ingresa el nombre del producto a buscar:");
    if (!termino) return;

    let resultados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(termino.toLowerCase())
    );

    if (resultados.length === 0) {
        console.log(`❌ No se encontraron productos con "${termino}"`);
    } else {
        console.log(`✅ Se encontraron ${resultados.length} producto(s):`);
        resultados.forEach(p => {
            console.log(`- ${p.nombre} (ID: ${p.id}) - $${p.precio.toLocaleString('es-CL')} CLP`);
        });
    }
}

function calcularEstadisticas() {
    console.clear();
    console.log("📊 === ESTADÍSTICAS DEL INVENTARIO === 📊");

    if (productos.length === 0) {
        console.log("⚠️  No hay productos para analizar");
        return;
    }

    let precios = productos.map(p => p.precio);
    let valorTotal = productos.reduce((total, p) => sumar(total, multiplicar(p.precio, p.stock)), 0);
    let precioPromedio = dividir(productos.reduce((sum, p) => sumar(sum, p.precio), 0), productos.length);
    let precioMaximo = Math.max(...precios);
    let precioMinimo = Math.min(...precios);
    let activos = productos.filter(p => p.activo).length;
    let inactivos = productos.filter(p => !p.activo).length;
    let stockTotal = productos.reduce((total, p) => sumar(total, p.stock), 0);

    console.log(`📦 Total de productos: ${productos.length}`);
    console.log(`✅ Productos activos: ${activos}`);
    console.log(`❌ Productos inactivos: ${inactivos}`);
    console.log(`📊 Stock total: ${stockTotal} unidades`);
    console.log(`💰 Valor total: $${valorTotal.toLocaleString('es-CL')} CLP`);
    console.log(`📈 Precio promedio: $${precioPromedio.toLocaleString('es-CL')} CLP`);
    console.log(`🔝 Precio más alto: $${precioMaximo.toLocaleString('es-CL')} CLP`);
    console.log(`🔻 Precio más bajo: $${precioMinimo.toLocaleString('es-CL')} CLP`);
}

function productosBajoStock() {
    console.clear();
    console.log("⚠️  === PRODUCTOS CON BAJO STOCK === ⚠️");

    let limiteInput = prompt("Ingresa el límite de stock para la alerta:");
    let limite = parseInt(limiteInput);

    if (isNaN(limite)) {
        alert("Debes ingresar un número válido");
        return;
    }

    console.log(`Productos con stock menor o igual a ${limite}:`);
    let contador = 0;

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].stock <= limite) {
            console.log(`⚠️  ${productos[i].nombre}: ${productos[i].stock} unidades`);
            contador++;
        }
    }

    if (contador === 0) {
        console.log("✅ No hay productos con bajo stock bajo ese límite");
    }
}

function aplicarDescuento() {
    console.log("🎉 === APLICAR DESCUENTO === 🎉");

    let porcentajeInput = prompt("Ingresa el porcentaje de descuento (0-100):");
    let porcentaje = parseFloat(porcentajeInput);

    if (isNaN(porcentaje) || porcentaje < 0 || porcentaje > 100) {
        alert("El porcentaje debe estar entre 0 y 100");
        return;
    }

    console.log(`Aplicando ${porcentaje}% de descuento...`);

    let i = 0;
    while (i < productos.length) {
        let precioOriginal = productos[i].precio;
        let descuento = multiplicar(precioOriginal, dividir(porcentaje, 100));
        let precioNuevo = restar(precioOriginal, descuento);

        console.log(`${productos[i].nombre}: $${precioOriginal.toLocaleString('es-CL')} -> $${precioNuevo.toLocaleString('es-CL')} CLP`);
        productos[i].precio = precioNuevo;
        i++;
    }
    alert("Descuento aplicado correctamente.");
}

function calculadora() {
    console.log("🧮 === CALCULADORA === 🧮");

    let num1 = parseFloat(prompt("Ingresa el primer número:"));
    let num2 = parseFloat(prompt("Ingresa el segundo número:"));

    if (isNaN(num1) || isNaN(num2)) {
        alert("Debes ingresar números válidos");
        return;
    }

    console.log(`Resultados con ${num1} y ${num2}:`);
    console.log(`➕ Suma: ${sumar(num1, num2)}`);
    console.log(`➖ Resta: ${restar(num1, num2)}`);
    console.log(`✖️  Multiplicación: ${multiplicar(num1, num2)}`);
    console.log(`➗ División: ${dividir(num1, num2)}`);
}

function ordenarPorPrecio() {
    console.log("💲 === ORDENAR POR PRECIO === 💲");

    let orden = prompt("¿Orden 'ascendente' o 'descendente'?");
    if (!orden) return;

    let productosOrdenados;
    switch (orden.toLowerCase()) {
        case 'ascendente':
        case 'asc':
            productosOrdenados = [...productos].sort((a, b) => a.precio - b.precio);
            break;
        case 'descendente':
        case 'desc':
            productosOrdenados = [...productos].sort((a, b) => b.precio - a.precio);
            break;
        default:
            alert("Opción no válida");
            return;
    }

    console.log(`Productos ordenados (${orden}):`);
    productosOrdenados.forEach(p => {
        console.log(`${p.nombre} - $${p.precio.toLocaleString('es-CL')} CLP`);
    });
}

// MODO MANUAL:
// El sistema no se reinicia automáticamente.
function iniciarSistema() {
    let mensaje = "🛍️ MENÚ PRINCIPAL\n\n" +
        "1. Ver productos\n" +
        "2. Agregar producto\n" +
        "3. Buscar producto\n" +
        "4. Estadísticas\n" +
        "5. Bajo stock\n" +
        "6. Descuento\n" +
        "7. Calculadora\n" +
        "8. Ordenar precios\n\n" +
        "Ingresa una opción (1-8):";

    setTimeout(() => {
        let opcion = prompt(mensaje);
        procesarOpcion(opcion);
    }, 200);
}

function procesarOpcion(opcion) {
    if (opcion === null || opcion === '0') {
        console.log("👋 Operación cancelada.");
        return;
    }

    switch (opcion) {
        case '1': mostrarProductos(); break;
        case '2': agregarProducto(); break;
        case '3': buscarProducto(); break;
        case '4': calcularEstadisticas(); break;
        case '5': productosBajoStock(); break;
        case '6': aplicarDescuento(); break;
        case '7': calculadora(); break;
        case '8': ordenarPorPrecio(); break;
        default: alert("Opción no válida");
    }

    console.log("\n✅ Acción completada. (Haz clic en 'Iniciar' para otra operación)");
}

console.log("✅ Sistema listo. Precios en CLP.");
