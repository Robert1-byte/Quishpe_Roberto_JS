const PRECIO_ENTRADA = 20;
const CUPOS_INICIALES = 50;
const DESCUENTO_ESTUDIANTE = 0.3;
const DESCUENTO_DOCENTE = 0.15;
const DESCUENTO_PUBLICO_GENERAL = 0;
const MAX_ENTRADAS_POR_COMPRA = 5;

const MENU = `SISTEMA INNOVA ESPE 2026

1. Comprar entradas
2. Consultar cupos disponibles
3. Consultar ingresos acumulados
4. Salir`;

let cuposDisponibles = CUPOS_INICIALES;
let entradasVendidas = 0;
let ingresosAcumulados = 0;
let comprasRealizadas = 0;

function normalizar(texto) {
  return texto.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function obtenerTipoParticipante(texto) {
  const clave = normalizar(texto);
  if (clave === "estudiante" || clave === "est") {
    return { etiqueta: "Estudiante", tasa: DESCUENTO_ESTUDIANTE };
  }
  if (clave === "docente" || clave === "profesor") {
    return { etiqueta: "Docente", tasa: DESCUENTO_DOCENTE };
  }
  if (clave === "publico general" || clave === "publico" || clave === "general") {
    return { etiqueta: "Público general", tasa: DESCUENTO_PUBLICO_GENERAL };
  }
  return null;
}

function leerCantidad() {
  const entrada = prompt("Cantidad de entradas:");
  if (entrada === null) return null;
  const texto = entrada.trim();
  if (!/^\d+$/.test(texto)) return null;
  const cantidad = Number(texto);
  if (cantidad < 1 || cantidad > MAX_ENTRADAS_POR_COMPRA) return null;
  return cantidad;
}

function comprarEntradas() {
  const nombre = prompt("Nombre del comprador:");
  if (nombre === null || nombre.trim() === "") {
    alert("Compra rechazada: ingrese un nombre válido.");
    return;
  }

  const entradaTipo = prompt("Tipo de participante: estudiante, docente o público general");
  const participante = entradaTipo === null ? null : obtenerTipoParticipante(entradaTipo);
  if (participante === null) {
    alert("Compra rechazada: tipo de participante no válido.");
    return;
  }

  const cantidad = leerCantidad();
  if (cantidad === null) {
    alert("Compra rechazada: la cantidad debe ser un entero entre 1 y 5.");
    return;
  }

  if (cantidad > cuposDisponibles) {
    alert(`Compra rechazada: solo quedan ${cuposDisponibles} cupos.`);
    return;
  }

  const subtotal = cantidad * PRECIO_ENTRADA;
  const descuento = subtotal * participante.tasa;
  const total = subtotal - descuento;

  cuposDisponibles -= cantidad;
  entradasVendidas += cantidad;
  ingresosAcumulados += total;
  comprasRealizadas += 1;

  const resumen = `SIMULACIÓN DE UNA COMPRA

Nombre: ${nombre.trim()}
Tipo de participante: ${participante.etiqueta}
Cantidad de entradas: ${cantidad}

Subtotal: $${subtotal.toFixed(2)}
Descuento (${participante.tasa * 100}%): $${descuento.toFixed(2)}
Total a pagar: $${total.toFixed(2)}

Compra realizada exitosamente.

Cupos restantes: ${cuposDisponibles}`;

  alert(resumen);
  console.log(resumen);
}

function consultarCupos() {
  let mensaje;
  if (cuposDisponibles > 10) {
    mensaje = "Cupos disponibles";
  } else if (cuposDisponibles > 0) {
    mensaje = "Últimos cupos disponibles";
  } else {
    mensaje = "Evento agotado";
  }

  const texto = `Cupos disponibles: ${cuposDisponibles}\n${mensaje}`;
  alert(texto);
  console.log(texto);
}

function consultarIngresos() {
  const texto = `Total de entradas vendidas: ${entradasVendidas}\nTotal de ingresos acumulados: $${ingresosAcumulados.toFixed(2)}\nNúmero de compras realizadas: ${comprasRealizadas}`;
  alert(texto);
  console.log(texto);
}

let opcion = "";
let clave = "";

while (clave !== "4") {
  const entrada = prompt(MENU);
  if (entrada === null) {
    clave = "4";
    break;
  }
  opcion = entrada;
  clave = opcion.trim();

  switch (clave) {
    case "1":
      comprarEntradas();
      break;
    case "2":
      consultarCupos();
      break;
    case "3":
      consultarIngresos();
      break;
    case "4":
      break;
    default:
      alert("Opción inexistente. Seleccione 1, 2, 3 o 4.");
      console.log("Opción inexistente:", opcion);
  }
}

const resumenFinal = `RESUMEN FINAL

Cupos disponibles: ${cuposDisponibles}
Total de entradas vendidas: ${entradasVendidas}
Total de ingresos acumulados: $${ingresosAcumulados.toFixed(2)}
Número de compras realizadas: ${comprasRealizadas}

Sistema finalizado.`;

alert(resumenFinal);
console.log(resumenFinal);
