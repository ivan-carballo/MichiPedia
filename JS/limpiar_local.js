/*
Aqui iran varias funciones para que al pulsar los botones del index, se elimine de Localstorage lo guardado como perfilFav
De esta forma se evita que el rotulo se quede de forma permanente con la raza del gato
*/


// Boton de ir a favoritos
const botonFav = document.getElementById('fav');
botonFav.addEventListener('click', (e) => {
    localStorage.setItem('perfilFav', '');
})

// Boton de ir a contacto
const botonForm = document.getElementById('form');
botonForm.addEventListener('click', (e) => {
    localStorage.setItem('perfilFav', '');
})

// Boton de ir a foro
const botonForo = document.getElementById('foro');
botonForo.addEventListener('click', (e) => {
    localStorage.setItem('perfilFav', '');
})
