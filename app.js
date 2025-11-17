// === CLAVE DE SESIÓN ===
const SESION_KEY = 'curso_lsc_sesion'; // Clave para la sesión del usuario
const PROGRESO_KEY = 'curso_lsc_progreso'; // Clave para el progreso del curso
let usuarioActual = null;

// === VERIFICAR SESIÓN ===
document.addEventListener('DOMContentLoaded', () => {
    const sesion = localStorage.getItem(SESION_KEY);
    if (!sesion) {
        // Si no hay sesión, no debería estar aquí. Redirigir al login.
        window.location.href = 'index.html';
        return;
    }
    usuarioActual = JSON.parse(sesion);
    inicializarApp();
});

// === ELEMENTOS DE LA APP ===
const nombreUsuarioEl = document.getElementById('nombreUsuario');
const cerrarSesionBtn = document.getElementById('cerrarSesion');

function inicializarApp() {
    nombreUsuarioEl.textContent = usuarioActual.nombre;

    // === CERRAR SESIÓN ===
    cerrarSesionBtn.addEventListener('click', () => {
        localStorage.removeItem(SESION_KEY);
        window.location.href = 'index.html';
    });

    marcarDiasCompletados();
}

/**
 * Lee el progreso del usuario desde localStorage y aplica un estilo a los días completados.
 */
function marcarDiasCompletados() {
    const progresoData = localStorage.getItem(PROGRESO_KEY);
    if (!progresoData) return; // No hay datos de progreso

    const todoElProgreso = JSON.parse(progresoData);
    const progresoUsuario = todoElProgreso[usuarioActual.id];

    if (progresoUsuario && progresoUsuario.diasCompletados) {
        progresoUsuario.diasCompletados.forEach(nombrePagina => {
            // Busca el enlace (<a>) que corresponde a la página completada
            const enlace = document.querySelector(`a[href="${nombrePagina}"]`);
            if (enlace) {
                // Aplica un estilo para marcarlo como completado
                enlace.style.border = '3px solid #28a745'; // Borde verde
            }
        });
    }
}