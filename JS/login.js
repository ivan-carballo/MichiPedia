/*
Aqui va todo el codigo relacionado con el inicio de usuario
*/


// Traer todos los getElementsByID
const inicioNombre = document.getElementById('sessionName');
const inicioPass = document.getElementById('sessionPass');

const new_nombre = document.getElementById('new_sessionName');
const new_pass = document.getElementById('new_sessionPass');
const new_passRepeat = document.getElementById('new_sessionPass_repeat');

const rotulo_inicio = document.getElementById('rotulo_inicioSession');
const rotulo_nuevo = document.getElementById('rotulo_newUser');

const buttonLogin = document.getElementById('button_login')
const buttonNew = document.getElementById('button_create')

const button_newUser = document.getElementById('button_newUser');
const button_enter = document.getElementById('button_enter');

const frameUser = document.getElementById('formSession');
const frameNewUser = document.getElementById('newUser');


// Reiniciar todos los campos
inicioNombre.value = '';
inicioPass.value = '';
new_nombre.value = '';
new_pass.value = '';
new_passRepeat.value = '';
rotulo_inicio.value = '';
rotulo_nuevo.value = '';
buttonLogin.value = '';
buttonNew.value = '';


// Funciones para cambiar entre pantalla de login y pantalla de crear usuario nuevo
frameNewUser.style.display = 'none';

button_newUser.addEventListener('click', (e) => {
    frameUser.style.display = 'none'
    frameNewUser.style.display = 'flex';
});

button_enter.addEventListener('click', (e) => {
    frameUser.style.display = 'flex'
    frameNewUser.style.display = 'none';
})



// Funcion para encriptar passwords
function sha256(texto) { 
    const hash = CryptoJS.SHA256(texto); 
    return hash.toString(CryptoJS.enc.Hex); 
}


// Buscar si en sessionStorage hay algun usuario
// Si lo hay, te lleva a la pagina del foro y si no ,tienes que loguearte
const userActive = sessionStorage.getItem('userOpen');
if (userActive === 'true') {
    perfilAbrir();
    function perfilAbrir() {
        window.open('./foro.html','_self');
    }
}


// Comprobar si el usuario que inicia sesion existe en localstorage
buttonLogin.addEventListener('click', (e) => {
    const userOpen = localStorage.getItem(inicioNombre.value)
    if (userOpen == null || userOpen == undefined) {
        // No existe
        const ocultar_inicioSession = document.getElementById('formSession');
        rotulo_inicio.innerText = 'El usuario no existe'
        rotulo_inicio.style.color = 'red';
        rotulo_inicio.style.fontSize = '1.8rem';
        inicioNombre.value = '';
        inicioPass.value = '';
    } else {
        // si existe
        const buscarUser = localStorage.getItem(inicioNombre.value)
        if (buscarUser === sha256(inicioPass.value)) {
            // Esta bien escrito, ve al foro
            perfilAbrir();
            function perfilAbrir() {
                sessionStorage.setItem('userOpen', 'true');
                sessionStorage.setItem('userName', inicioNombre.value);
                window.open('./foro.html','_self');
            }
        } else {
            // Esta mal escrito, repite
            rotulo_inicio.innerText = 'El password es incorrecto'
            rotulo_inicio.style.color = 'red';
            rotulo_inicio.style.fontSize = '1.8rem';
            inicioPass.value = '';
        }
    }
});




// Aqui se va a crear un usuario nuevo
buttonNew.addEventListener('click', (e) => {
    // Comprobar si la nueva pass tiene numeros y letras
    function alfanumerico(cadena) {
        return /[A-Za-z]/.test(cadena) && /\d/.test(cadena);
    }

    // Comprobar si el usuario ya existe
    const usedName = localStorage.getItem(new_nombre.value);
    if (usedName === null || usedName === undefined) {
        crearPass();
    } else {
        rotulo_nuevo.innerText = 'Usuario ya existente';
        rotulo_nuevo.style.color = 'red';
        rotulo_nuevo.style.fontSize = '1.5rem'
        new_pass.value = '';
        new_passRepeat.value = '';
        new_nombre.value = '';
    }

    function crearPass() {
        if (new_pass.value !== new_passRepeat.value) {
            // Los passwords deben ser iguales
            rotulo_nuevo.innerText = 'Los password no coinciden'
            rotulo_nuevo.style.color = 'red';
            rotulo_nuevo.style.fontSize = '1.5rem'
            new_pass.value = '';
            new_passRepeat.value = '';
        } else if (new_pass.value.length < 6) {
            // Los passwords deben tener al menos 6 caracteres
            rotulo_nuevo.innerText = 'Tu password debe tener al menos 6 caracteres'
            rotulo_nuevo.style.color = 'red';
            rotulo_nuevo.style.fontSize = '1.5rem'
            new_pass.value = '';
            new_passRepeat.value = '';
        } else if (!alfanumerico(new_pass.value)) {
            // Los passwords deben tener letras y numeros a la vez
            rotulo_nuevo.innerText = 'Tu password debe contener letras y numeros'
            rotulo_nuevo.style.color = 'red';
            rotulo_nuevo.style.fontSize = '1.5rem'
            new_pass.value = '';
            new_passRepeat.value = '';
        } else {
            // encriptar y añadir a localstorage
            rotulo_nuevo.innerText = 'Usuario creado correctamente'
            rotulo_nuevo.style.color = 'green';
            rotulo_nuevo.style.fontSize = '1.5rem'
            localStorage.setItem(new_nombre.value, sha256(new_pass.value));
            new_pass.value = '';
            new_passRepeat.value = '';
            new_nombre.value = '';
        }
    }

});


