import { apiKey } from "./API.js";

const apiUrl = 'https://api.api-ninjas.com/v1/cats';

let listaGatos = [];
let unidad;

// Esconder el rotulo del nombre de la raza hasta que sea necesario volver a desplegarlo
let rotuloPrincipal_0 = document.getElementById('tituloRaza');
rotuloPrincipal_0.style.display = 'none';

// Crear funcion de llamada a la API pasando como argumento el numero de paginacion
// Despues los datos se pasan a json y se saca unicamente los nombres de las razas de gato
// Por ultimo se hace una llamada a la funcion desplegableFinal() donde se pasaran los datos al DOM
async function getCats(offset) {
  const url = new URL(apiUrl);
  url.searchParams.append("min_weight", 0.001);
  url.searchParams.append('offset', offset)
  url.searchParams.append('X-Api-Key', apiKey);
  try {
      const response = await fetch(url.toString());
      let data = await response.json();
      for (unidad of data) {
        listaGatos.push(unidad['name']);

        // Usar LocalStorage para guardar cada una de las razas y evitar tener que hacer tantas llamadas a la API
        localStorage.setItem(unidad['name'], JSON.stringify(unidad));
      }
      desplegableFinal();
  }
  catch (error) {
      console.error(error);
  }
}

// Bucle para llamar a la funcion getCats() varias veces
// Se hace esto por que el maximo de datos por llamada son 20 y existen mas razas de gato
// Por lo que se hacen varias llamadas de 20 razas cada una hasta llegar al total
let i = 0;
while (i < 100) {
  getCats(i);
  //console.log(i);
  i += 20;
}

// Funcion para a traves de DOM crear las opciones en un desplegable del HTML
// La informacion viene de getCats() y es una opcion por cada raza de gato
async function desplegableFinal() {
  if (listaGatos.length === 82) {
    listaGatos.sort();
    for (unidad of listaGatos) {
      const desplegable = document.getElementById('razas');
      let opciones = document.createElement('option');
      opciones.textContent = unidad;
      opciones.setAttribute('value', unidad);
      desplegable.appendChild(opciones);
    }
  }
}


