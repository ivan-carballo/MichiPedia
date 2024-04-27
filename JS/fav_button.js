// Aqui se pondran las instrucciones para añadir o quitar los favs desde index.html


const no = '<i id="fav_no" class="fa-regular fa-heart fav"></i>';
const puede = '<i id="fav_hover" class="fa-regular fa-heart fav" style="color: #be0105;"></i>';
const yes = '<i id="fav_yes" class="fa-sharp fa-solid fa-heart fav" style="color: #be0105;"></i>';


const favNO = document.getElementById('fav_no');
const favYES = document.getElementById('fav_yes');
const favHOVER = document.getElementById('fav_hover');
const favDIV = document.getElementById('addFav');

const select_razas = document.getElementById('razas');
let favEncontrar;



// Funcion para buscar si existe la raza ya en fav
function buscarLocal() {
    let favBuscar = localStorage.getItem('razas');
    if (favBuscar === null) {
        localStorage.setItem('razas','');
    } else {
        favEncontrar = favBuscar.includes(select_razas.value);
        return favEncontrar;
    }
}


// Que aparezcan los iconos de hacer fav de forma automatica cuando tiene un perfil en localStorage
const cargarPerfilLocal = localStorage.getItem('perfil');
if (cargarPerfilLocal === null) {
    localStorage.setItem('perfil', '')
}

if (cargarPerfilLocal.length > 1) {
        if (cargarPerfilLocal.length > 1) {
            setTimeout(function(){
                favDIV.style.display = 'initial';
                localStorage.setItem('perfil', '')
            }, 1200);
    
            // Que use la raza seleccionada para saber si esta o no como fav
            buscarLocal()
    
            if (favEncontrar) {
                favNO.className = 'fa-sharp fa-solid fa-heart fav';
                favNO.style.color = '#be0105';
            } else {
                favNO.className = 'fa-regular fa-heart fav';
                favNO.style.color = '';
            }
        }
}


// Que aparezca el boton del fav 1.2 segundos despues de haber seleccionado una raza
select_razas.addEventListener('click', (e) => {
    if (select_razas.value.length > 1) {
        setTimeout(function(){
            favDIV.style.display = 'initial';
        }, 1200);

        // Que use la raza seleccionada para saber si esta o no como fav
        buscarLocal()

        if (favEncontrar) {
            favNO.className = 'fa-sharp fa-solid fa-heart fav';
            favNO.style.color = '#be0105';
        } else {
            favNO.className = 'fa-regular fa-heart fav';
            favNO.style.color = '';
        }
    }
})


// Funcion para cuando se pulsa el boton del fav
favNO.addEventListener('click', (e) => {
    buscarLocal();

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
            favRaza = document.getElementById('razas');
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
            favRaza = document.getElementById('razas');
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