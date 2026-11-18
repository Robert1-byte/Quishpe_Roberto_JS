# Innova ESPE 2026

Prototipo en JavaScript nativo para registrar entradas, aplicar descuentos y controlar cupos mediante `prompt()`, `alert()` y `console.log()`.

## Estructura
- `index.html`: carga el script.
- `js/app.js`: lógica del sistema.
- `Readme.md`: esta guía.

## Ejecución
Abrir `index.html` en el navegador y pulsar F12 para ver `console.log()`. No requiere servidor ni manipulación del DOM.

## Validación
Estudiante 3 entradas = $42; docente 2 = $34; público general 1 = $20. Se rechazan cantidades <1, >5, texto y compras sin cupo; la opción inválida muestra error y la opción 4 muestra el resumen final.
