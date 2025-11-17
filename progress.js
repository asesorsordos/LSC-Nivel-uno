// === CLAVES PARA LOCALSTORAGE ===
const SESION_KEY = 'curso_lsc_sesion';
const PROGRESO_KEY = 'curso_lsc_progreso';

/**
 * Obtiene el progreso de todos los usuarios.
 * @returns {object} Un objeto con el progreso de todos los usuarios.
 */
function obtenerTodoElProgreso() {
    const data = localStorage.getItem(PROGRESO_KEY);
    return data ? JSON.parse(data) : {};
}

/**
 * Guarda el progreso de un día como completado para el usuario actual.
 */
function guardarProgresoDia() {
    const sesionData = localStorage.getItem(SESION_KEY);
    if (!sesionData) {
        // Si no hay sesión, no se puede guardar progreso.
        console.error("No hay sesión de usuario activa para guardar el progreso.");
        // Opcional: redirigir al login si se accede a una página de curso sin sesión.
        // window.location.href = 'index.html'; 
        return;
    }

    const usuarioActual = JSON.parse(sesionData);
    const userId = usuarioActual.id;
    const todoElProgreso = obtenerTodoElProgreso();

    // Obtiene el nombre del archivo actual (ej. "Dia 1.html")
    const nombrePagina = window.location.pathname.split('/').pop();

    // Inicializa el progreso para el usuario si no existe
    if (!todoElProgreso[userId]) {
        todoElProgreso[userId] = { diasCompletados: [] };
    }

    // Añade el día actual a la lista de completados si no está ya
    if (!todoElProgreso[userId].diasCompletados.includes(nombrePagina)) {
        todoElProgreso[userId].diasCompletados.push(nombrePagina);
    }

    // Guarda el objeto de progreso actualizado en localStorage
    localStorage.setItem(PROGRESO_KEY, JSON.stringify(todoElProgreso));
}

// Llama a la función para guardar el progreso tan pronto como se carga la página del curso.
document.addEventListener('DOMContentLoaded', guardarProgresoDia);