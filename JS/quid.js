/*
Aqui van todas las funciones relacionadas con el Quiz de preguntas
*/

// Datos y variables necesarias para la llamada a la API
import { textoGato } from "./quizRespuestas.js";
import { apiKey } from "./API.js";
const apiUrl = 'https://api.api-ninjas.com/v1/cats';

let listaGatos = [];
let unidad;
let final;


// Capturar los botones necesarios
const buttonResultados = document.getElementById('p_buttonQuiz');

const rotuloFinal = document.getElementById('aviso');
const favNO = document.getElementById('fav_no');

const pregunta1 = document.getElementsByClassName('pregunta_1');
const pregunta2 = document.getElementsByClassName('pregunta_2');
const pregunta3 = document.getElementsByClassName('pregunta_3');
const pregunta4 = document.getElementsByClassName('pregunta_4');
const pregunta5 = document.getElementsByClassName('pregunta_5');
const pregunta6 = document.getElementsByClassName('pregunta_6');
const pregunta7 = document.getElementsByClassName('pregunta_7');
const pregunta8 = document.getElementsByClassName('pregunta_8');


// Al hacer click en enviar resultados, hace una puntuacion entre el trato y la alegria
// Despues uso esos valores para la busqueda desde la API y abro el perfil en el index.html
buttonResultados.addEventListener('click', (e) => {
    let total = 0;
    let contador = 0;

    // Obtengo el valor de cada una de las preguntas
    for (let i = 0; i < 4; i++) {
        if (pregunta1[i]['checked']) {
            total += parseInt(pregunta1[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta2[i]['checked']) {
            total += parseInt(pregunta2[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta3[i]['checked']) {
            total += parseInt(pregunta3[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta4[i]['checked']) {
            total += parseInt(pregunta4[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta5[i]['checked']) {
            total += parseInt(pregunta5[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta6[i]['checked']) {
            total += parseInt(pregunta6[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta7[i]['checked']) {
            total += parseInt(pregunta7[i]['value']);
            contador++;
        }
    }

    for (let i = 0; i < 4; i++) {
        if (pregunta8[i]['checked']) {
            total += parseInt(pregunta8[i]['value']);
            contador++;
        }
    }


    // Sumo los valores y hago calculos para tener un rango de 1 a 5 incluidos 
    total = (total + 2) / 8;
    total = Math.floor(total);


    // Con las puntuaciones hago busqueda de API
    // Uso llamada a la API con cierto tiempo de retraso para que le de margen a hacer calculos   
    if (contador == 8) {
        rotuloFinal.innerText = '';

        setTimeout(() => {
            calculos();
        }, 200);

    } else {
        rotuloFinal.innerText = 'Debes contestar a todas las preguntas';
    }


    async function calculos() {

        getAlegre();
        async function getAlegre() {
            const url = new URL(apiUrl);
            url.searchParams.append('family_friendly', total)
            url.searchParams.append('X-Api-Key', apiKey);
            try {
                const response = await fetch(url.toString());
                let data_alegre = await response.json();
                let cantidad_alegre = data_alegre.length;

                if (cantidad_alegre > 1) {
                    let random = Math.random() * (cantidad_alegre - 1) + 1;
                    final = data_alegre[parseInt(random)]
                } else {
                    final = data_alegre[0];
                }

                mostrarResultado(final);

            } catch (error) {
                console.error(error);
            }
        }


        function mostrarResultado(name) {
            
            setTimeout(() => {
                
                // Aqui trabajar en el DOM para enseñar la ficha del gato
                const divPerfil = document.getElementById('cuerpo');
                const respuesta = document.getElementById('respuesta');
                divPerfil.style.display = 'none';  
                respuesta.style.display = 'grid';
                

                const rotuloName = document.getElementById('tituloRaza');
                rotuloName.innerText = name['name'];

                const imgAPI = document.getElementById('imageAPI');
                const imgCreate = document.createElement('img');
                imgCreate.setAttribute('src', name['image_link']);
                imgCreate.setAttribute('id', 'CatIMG');
                imgAPI.appendChild(imgCreate);

                const textoLargo = document.getElementById('respuestaTexto');

                if (total == 1) {
                    textoLargo.innerText = textoGato[1];
                } else if (total == 5) {
                    textoLargo.innerText = textoGato[0];
                } else {
                    textoLargo.innerText = textoGato[2];
                }

                buscarLocal(name['name']);

                // Añadir un retardo para meter el gato de alicia en el pais de las maravillas


            }, 500);
        }

    }

});


// Funcion para buscar si existe la raza ya en fav
function buscarLocal(razaQuiz) {
    let favBuscar = localStorage.getItem('razas');
    if (favBuscar === null) {
        localStorage.setItem('razas','');
    } else {
        let favEncontrar = favBuscar.includes(razaQuiz);

        if (favEncontrar) {
            favNO.className = 'fa-sharp fa-solid fa-heart fav';
            favNO.style.color = '#be0105';
        } else {
            favNO.className = 'fa-regular fa-heart fav';
            favNO.style.color = '';
        }


        // Funcion para cuando se pulsa el boton del fav
        favNO.addEventListener('click', (e) => {

            if (favEncontrar) {
                // Cuando se pulsa el boton de fav para quitar el fav
                favNO.className = 'fa-regular fa-heart fav';
                favNO.style.color = '';

                let perfilLocalFav = localStorage.getItem('perfilFav');
                if (perfilLocalFav === null) {
                    localStorage.setItem('perfilFav', '');
                    perfilLocalFav = '';
                }

                let favRaza;
                if (perfilLocalFav.length > 1) {
                    favRaza = perfilLocalFav;
                } else {
                    favRaza = document.getElementById('tituloRaza');
                    favRaza = favRaza.value;
                }

                let favLista = localStorage.getItem('razas');
                let newLista = favLista.replaceAll(`${favRaza},`, '');
                localStorage.setItem('razas', newLista);
                let confirm = localStorage.getItem('perfilFav');

                if (confirm.length > 1) {
                    setTimeout(() => {
                        localStorage.setItem('perfilFav', '');
                        window.open('./html/favs.html', '_self');
                    }, "200");
                }

            } else {
                // Cuando se pulsa el boton de fav para poner el fav
                favNO.className = 'fa-sharp fa-solid fa-heart fav';
                favNO.style.color = '#be0105';

                let perfilLocalFav = localStorage.getItem('perfilFav');
                if (perfilLocalFav === null) {
                    localStorage.setItem('perfilFav', '');
                    perfilLocalFav = '';
                }

                let favRaza;
                if (perfilLocalFav.length > 1) {
                    favRaza = perfilLocalFav;
                } else {
                    favRaza = document.getElementById('tituloRaza');
                    favRaza = favRaza.value;
                }

                let favLista;
                favLista = localStorage.getItem('razas');
                
                if (favLista === null) {
                    localStorage.setItem('razas', `${favRaza},`)
                } else {
                    favLista = `${favLista}${favRaza},`
                    localStorage.setItem('razas', favLista);
                }
            }
        })

    }
}