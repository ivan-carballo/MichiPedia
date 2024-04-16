// Este archivo se ocupa unicamente de las llamadas a dos APIs

// Esta funcion llama a una API de fotos random de gatos
// Convierto la info en json y a traves de DOM meto la URL de la imagen en el HTML
async function catsPhoto() {
    const url = new URL("https://api.thecatapi.com/v1/images/search");
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        let foto = data[0]['url'];
        const divPhoto = document.getElementById('catPhoto');
        divPhoto.innerHTML = `<img src="${foto}">`;
    }
    catch (error) {
        console.error(error);
    }
}

// Esta funcion llama a una API de datos random de gatos
// Convierto la info en json y a traves de DOM meto la cadena de texto en el HTML
async function catsFact() {
    const url = new URL("https://catfact.ninja/fact");
    try {
        const response = await fetch(url.toString());
        const data = await response.json();
        let fact = data['fact'];
        const divFact = document.getElementById('catFact');
        divFact.innerText = fact;
        
    }
    catch (error) {
        console.error(error);
    }
}

// Llamo a las dos funciones para que hagan la llamada nada mas cargar el HTML
catsPhoto();
catsFact();

// Creo una funcion setInterval() para que cada 30 segundos haga una llamada a las funciones de API
// De esta forma cada 30 segundos se cargara a traves de DOM al HTML una nueva foto y un nuevo dato sobre gatos
let periodicidad = setInterval(() => {
    catsPhoto();
    catsFact();
}, 1000 * 30);