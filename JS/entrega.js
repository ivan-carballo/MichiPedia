// Aqui se hara la llamada a la API con el nombre de la raza seleccionada
// Despues se pasara a traves del DOM al HTML para mostrar todo en pantalla

const namesAPI = [
    'origin', 
    'children_friendly', 
    'family_friendly',
    'other_pets_friendly',
    'stranger_friendly',
    'general_health',
    'grooming',
    'intelligence',
    'length',
    'max_life_expectancy',
    'max_weight',
    'meowing',
    'playfulness',
    'shedding'
];


// Revisar si en localStorage hay un perfil cargado previamente desde Favs
// Si hay uno creado, entonces abre dicho perfil y desues borra localStorage
// Si no hay, entonces no hace nada, carga de forma normal
let cargarPerfil = localStorage.getItem('perfil');

if (cargarPerfil === null) {
    localStorage.setItem('perfil', '')
    cargarPerfil = '';
}

let namePermanente = localStorage.getItem('perfilFav');
let rotuloPrincipal = document.getElementById('tituloRaza');
if (namePermanente.length > 1) {
    rotuloPrincipal.innerText = namePermanente
    rotuloPrincipal.style.display = 'grid';
}


if (cargarPerfil.length > 1) {
        const optionInitial = document.getElementById('initial')
        optionInitial.setAttribute('disabled', 'yes');
    
        const desplegableSeleccion = document.getElementById('razas');
        if (cargarPerfil.length > 0) {
            // funcion para llamar a la API con la raza concreta que se ha seleccionado
            getCat(cargarPerfil)
            async function getCat(name) {
                //const url = new URL(apiUrl);
                //url.searchParams.append("name", name);
                //url.searchParams.append('X-Api-Key', apiKey);
                try {
                    //const response = await fetch(url.toString());
                    //let data = await response.json();
                    let data = localStorage.getItem(name);
                    data = JSON.parse(data);
                    let imageAPI = document.getElementById('imageAPI');
                    imageAPI.innerHTML = `<img src="${data['image_link']}">`;
    
                    namesAPI.forEach(nameUnitario => {
                        let API_Name = document.getElementById(nameUnitario);
                        if (data[nameUnitario] !== undefined) {
                            if (nameUnitario !== 'origin' && nameUnitario !== 'length' && nameUnitario !== 'max_weight' && nameUnitario !== 'max_life_expectancy') {
                                API_Name.innerHTML = `<img class='imgBarras' src='./assets/barras/0${data[nameUnitario]}.png'>` 
                            } else if (nameUnitario === 'max_weight') {
                                API_Name.innerText = data[nameUnitario] + ' lb';
                            } else if (nameUnitario === 'max_life_expectancy') {
                                API_Name.innerText = data[nameUnitario] + ' years';
                            } else {
                                API_Name.innerText = data[nameUnitario];
                            }
                        } else {
                            API_Name.innerText = 'Sin datos';
                            API_Name.style.color = 'orange';
                            API_Name.style.fontStyle = 'italic';
                        }
    
                        const articletextAPI = document.getElementById('textAPI');
                        articletextAPI.removeAttribute('hidden');
                        articletextAPI.style.display = 'grid';

                    });
                }
                catch (error) {
                    console.error(error);
                }
              }
        }
    }



// Uso un escuchador de eventos (No es GPT, lo juro >.<) para saber cuando se selecciona una raza y su nombre
const desplegableClick = addEventListener('click', (e) => {

    const optionInitial = document.getElementById('initial')
    optionInitial.setAttribute('disabled', 'yes');

    const desplegableSeleccion = document.getElementById('razas');
    if (desplegableSeleccion.value.length > 0) {

        localStorage.setItem('perfilFav', '');
        // funcion para llamar a la API con la raza concreta que se ha seleccionado
        getCat(desplegableSeleccion.value)
        async function getCat(name) {
            //const url = new URL(apiUrl);
            //url.searchParams.append("name", name);
            //url.searchParams.append('X-Api-Key', apiKey);
            try {
                //const response = await fetch(url.toString());
                //let data = await response.json();
                let data = localStorage.getItem(name);
                data = JSON.parse(data);
                let imageAPI = document.getElementById('imageAPI');
                imageAPI.innerHTML = `<img src="${data['image_link']}">`;

                rotuloPrincipal.innerText = name;
                rotuloPrincipal.style.display = 'grid';

                namesAPI.forEach(nameUnitario => {
                    let API_Name = document.getElementById(nameUnitario);
                    if (data[nameUnitario] !== undefined) {
                        if (nameUnitario !== 'origin' && nameUnitario !== 'length' && nameUnitario !== 'max_weight' && nameUnitario !== 'max_life_expectancy') {
                            API_Name.innerHTML = `<img class='imgBarras' src='./assets/barras/0${data[nameUnitario]}.png'>` 
                        } else if (nameUnitario === 'max_weight') {
                            API_Name.innerText = data[nameUnitario] + ' lb';
                        } else if (nameUnitario === 'max_life_expectancy') {
                            API_Name.innerText = data[nameUnitario] + ' years';
                        } else {
                            API_Name.innerText = data[nameUnitario];
                        }
                    } else {
                        API_Name.innerText = 'Sin datos';
                        API_Name.style.color = 'orange';
                        API_Name.style.fontStyle = 'italic';
                    }

                    const articletextAPI = document.getElementById('textAPI');
                    articletextAPI.removeAttribute('hidden');
                    articletextAPI.style.display = 'grid';
                });
            }
            catch (error) {
                console.error(error);
            }
          }
    }
});