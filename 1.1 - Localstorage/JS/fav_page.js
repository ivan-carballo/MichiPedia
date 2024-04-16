// Aqui iran las funciones para que aparezcan en favs.html todas las razas favoritas


// Sacar informacion de localstorage y pasarla a array
const favsList = localStorage.getItem('razas');
let favsArray = favsList.substring(0, favsList.length - 1);
favsArray = favsArray.split(','); 
favsArray.sort();


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


// Crear un bucle de busqueda en la API de las razas
for (unidad of favsArray) {
    const apiKey = 'v8CnkGr1j1Bmjv8XXus7TA==3CMJqnIw02JUh5QN';
    const apiUrl = 'https://api.api-ninjas.com/v1/cats';

    getCats(unidad)
    async function getCats(unidad) {
        //const url = new URL(apiUrl);
        //url.searchParams.append('name', unidad)
        //url.searchParams.append('X-Api-Key', apiKey);
        try {
           //const response = await fetch(url.toString());
            //let data = await response.json();
            let data = localStorage.getItem(unidad);
            data = JSON.parse(data);
            
            // Crear un article por cada raza en favoritos
            const sectionFav = document.getElementById('favs');
            let articleFav = document.createElement('article');
            articleFav.setAttribute('id', unidad);
            articleFav.setAttribute('class', 'allFavs');
            articleFav.innerHTML = `<h2 class='name'>${unidad}</h2>
                                    <img class='image' src='${data['image_link']}'>
                                    <p id='${unidad}' class='delete'>Quitar de Fav</p>`;
            sectionFav.appendChild(articleFav);

        }
        catch (error) {
            console.error(error);
        }
      }
}

// Hacer que al pulsar en el nombre de la raza te lleve al index con su ficha abierta
setTimeout(() => {
    
    const buscarName = document.querySelectorAll('h2')

    for (let i = 0; buscarName.length > i; i++) {
        buscarName[i].addEventListener('click', (e) => {
            let name = buscarName[i]['innerText'];
            localStorage.setItem('perfil', name);
            localStorage.setItem('perfilFav', name);

            perfilAbrir();
            function perfilAbrir() {
                window.open('./index.html','_self');
            }

        })
    }

  }, "1000");
  