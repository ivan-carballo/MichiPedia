// Aqui pondre las funciones para eliminar favoritos desde la pagina de favoritos



// Si no se tiene ningun favorito, va a aparecer en pantalla un mensaje avisando de elos
// Para evitar pensar que es por algun error de carga que no aparezcan cards de las razas
confirmarFavs();
function confirmarFavs() {
    const confirmarFavs = localStorage.getItem('razas');
    const section_noFavs = document.getElementById('noFavs');
    if (confirmarFavs === null || confirmarFavs.length < 1) {
        // aqui va el mensaje cuando no hay nada
        section_noFavs.style.display = 'initial';
    } else {
        section_noFavs.style.display = 'none';
    }
}


// Uso una funcion de espera para que le de tiempo a cargar todo lo que hay en localStorage antes de hacer las busquedas
setTimeout(function(){
  const buscarQuery = document.querySelectorAll('p');

  // Bucle para pasar por todas las opciones posibles y elegir unicamente a la que se haga click
  for (let i = 0; buscarQuery.length > i; i++) {
    buscarQuery[i].addEventListener('click', (e) => {
        const buscarID = document.getElementById(buscarQuery[i]['id'])
        const eliminar = buscarID.remove(); // Eliminar la tarjeta de la raza seleccionada

        // Eliminar la raza del localStorage
        const datosLocal = localStorage.getItem('razas');
        newDatosLocal = datosLocal.replace(`${buscarID['id']},`, '');
        localStorage.setItem('razas', newDatosLocal);

        // Llamar a la funcion de aviso de no favoritos
        confirmarFavs();
    })
}
}, 2000);





