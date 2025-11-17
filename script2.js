// === SISTEMA DE AUTENTICACIÓN ===
// Ya no necesitamos 'app' y 'authScreen' en este script, pues están en páginas separadas.
// const authScreen = document.getElementById('authScreen');
// const app = document.getElementById('app');
const authForm = document.getElementById('authForm');
const authTitle = document.getElementById('authTitle');
const authBtn = document.getElementById('authBtn');
const toggleText = document.getElementById('toggleText');
const toggleLink = document.getElementById('toggleLink');
const registroCampos = document.getElementById('registroCampos');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const nombreInput = document.getElementById('nombre');

let esRegistro = false;
let usuarioActual = null;

// === LOCALSTORAGE KEYS ===
const USUARIOS_KEY = 'curso_lsc_usuarios';
const SESION_KEY = 'curso_lsc_sesion';

// === CARGAR DATOS ===
// Al cargar index.html, si ya hay sesión, redirigir a la app.
document.addEventListener('DOMContentLoaded', () => {
    const sesion = localStorage.getItem(SESION_KEY);
    if (sesion) {
        window.location.href = 'app.html'; // Redirige si ya está logueado
    }
});

// === MOSTRAR PANTALLAS ===
function mostrarLogin() {
    window.location.href = 'index.html';
}

function mostrarApp() {
    window.location.href = 'app.html';
}

// === TOGGLE REGISTRO / LOGIN ===
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    esRegistro = !esRegistro;
    actualizarFormularioAuth();
});

function actualizarFormularioAuth() {
    if (esRegistro) {
        authTitle.textContent = 'Registrarse';
        authBtn.textContent = 'Crear Cuenta';
        registroCampos.style.display = 'block';
        toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="toggleLink">Inicia sesión</a>';
    } else {
        authTitle.textContent = 'Iniciar Sesión';
        authBtn.textContent = 'Iniciar Sesión';
        registroCampos.style.display = 'none';
        toggleText.innerHTML = '¿No tienes cuenta? <a href="#" id="toggleLink">Regístrate aquí</a>';
    }
}

// === AUTENTICACIÓN ===
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    if (esRegistro) {
        const nombre = nombreInput.value.trim();
        if (!nombre || !email || !password) {
            alert('Completa todos los campos');
            return;
        }
        if (!validarPassword(password)) {
            return; // La función validarPassword ya muestra la alerta.
        }
        registrarUsuario(nombre, email, password);
    } else {
        iniciarSesion(email, password);
    }
});

function validarPassword(password) {
    const minLength = 8;
    const errores = [];

    if (password.length < minLength) {
        errores.push("debe tener al menos 8 caracteres.");
    }
    if (!/[A-Z]/.test(password)) {
        errores.push("debe contener al menos una letra mayúscula.");
    }
    if (!/[a-z]/.test(password)) {
        errores.push("debe contener al menos una letra minúscula.");
    }
    if (!/[0-9]/.test(password)) {
        errores.push("debe contener al menos un número.");
    }

    if (errores.length > 0) {
        alert("La contraseña no es segura:\n- " + errores.join("\n- "));
        return false;
    }
    return true;
}

function registrarUsuario(nombre, email, password) {
    const usuarios = obtenerUsuarios();
    if (usuarios.find(u => u.email === email)) {
        alert('Este email ya está registrado');
        return;
    }
    const nuevoUsuario = {
        id: Date.now().toString(),
        nombre,
        email,
        password // ¡En producción usar hash!
    };
    usuarios.push(nuevoUsuario);
    localStorage.setItem(USUARIOS_KEY, JSON.stringify(usuarios));
    alert('¡Registro exitoso! Ahora inicia sesión.');
    esRegistro = false;
    actualizarFormularioAuth();
    authForm.reset();
}

function iniciarSesion(email, password) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (!usuario) {
        alert('Email o contraseña incorrectos');
        return;
    }
    usuarioActual = { id: usuario.id, nombre: usuario.nombre, email: usuario.email };
    localStorage.setItem(SESION_KEY, JSON.stringify(usuarioActual));
    mostrarApp(); // Redirige a app.html
    authForm.reset();
}

function obtenerUsuarios() {
    const data = localStorage.getItem(USUARIOS_KEY);
    return data ? JSON.parse(data) : [];
}