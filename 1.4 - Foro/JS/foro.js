/*
Aqui iran todas las funciones relacionadas con el foro de discusion
*/


// Comprobar si existe en Localstorage una linea para los temas y crearla si no hay
const confirmarTopic = localStorage.getItem('topics');
if (confirmarTopic === null || confirmarTopic === undefined) {
    localStorage.setItem('topics', '');
}


// comprobar que existe un usuario activo, en caso contrario mandar a login
const confirmar_userActive = sessionStorage.getItem('userOpen');
if (confirmar_userActive === 'true') {
    // No funciona si uso "'!== 'true'" asi que tengo que usar if completo
} else {
    window.open('./login.html','_self');
}


// Boton de cerrar sesion de la cuenta activa
const button_sessionClose = document.getElementById('sessionClose');
button_sessionClose.addEventListener('click', (e) => {
    perfilAbrir();
    function perfilAbrir() {
        sessionStorage.removeItem('userOpen');
        sessionStorage.removeItem('userName');
        window.open('./foro.html','_self');
    }
});


// Cargar todos los temas existentes en un array ordenado alfabeticamente
let buscarTopics = localStorage.getItem('topics');
let topicsArray = buscarTopics.substring(0, buscarTopics.length - 1);
topicsArray = topicsArray.split(',');
topicsArray.sort();


// Usar el array con todos los temas y hacer bucle para sacarlo en columna izquierda
cargarTopics()
function cargarTopics() {
    const includeTopics = document.getElementById('topics');
    includeTopics.innerHTML = '';

    for (let i = 1; topicsArray.length > i; i++) {
        const create_pTopics = document.createElement('p');
        create_pTopics.setAttribute('class', 'p_topics');
        create_pTopics.setAttribute('id', topicsArray[i]);
        create_pTopics.innerText = topicsArray[i];
        includeTopics.appendChild(create_pTopics);
    }
}


// Botones crear nuevo tema
// uno para escribir el nombre y el otro para crearlo en localstorage
const button_newTopic = document.getElementById('newTopic');
const input_newTopic = document.getElementById('nameTopic');
const p_newTopic = document.getElementById('acceptTopic');
const divCrearTopic = document.getElementById('crearTopic');
const deleteTopic = document.getElementById('deleteTopic');
const acceptDelete = document.getElementById('acceptDelete');

// Abrir input para nombrar nuevo tema y boton de crear
button_newTopic.addEventListener('click', (e) => {
    if (divCrearTopic.style.display !== 'flex') {
        input_newTopic.value = '';
        divCrearTopic.style.display = 'flex';  
        input_newTopic.style.display = 'initial';
        p_newTopic.style.display = 'initial';
        deleteTopic.style.display = 'none';
        acceptDelete.style.display = 'none';
    } else {
        input_newTopic.value = '';
        divCrearTopic.style.display = 'none'; 
        input_newTopic.style.display = 'none';
        p_newTopic.style.display = 'none'; 
    }
});

// Se hacen dos guardados en localstorage - Guardar en indice y una numeracion
p_newTopic.addEventListener('click', (e) => {
    if (input_newTopic.value.length > 1) {
        topicsArray.push(input_newTopic.value);
        localStorage.setItem('topics', `${topicsArray},`);
        localStorage.setItem(`${input_newTopic.value}-ID`, '0');
        divCrearTopic.style.display = 'none';
        input_newTopic.value = '';
        window.location.reload()
    } else {
        input_newTopic.setAttribute('placeholder', 'Falta nombre de tema');
        input_newTopic.style.color = 'red';
        input_newTopic.style.fontWeight = '700';
    }
});



// Se crea un bucle para que cuando un usuario pulse en un tema, sepa que tema es
const topicClass = document.getElementsByClassName('p_topics');

for (let i = 0; topicClass.length > i; i++) {
    const topicOpen = document.getElementById(topicClass[i].id);

    topicOpen.addEventListener('click', (e) => {
        // Reiniciar los campos
        const reboot_newPost = document.getElementById('newPost');
        reboot_newPost.innerHTML = '';


        mostrar_oldPosts(topicClass[i].id);
        function mostrar_oldPosts(topicClassName) {
            // Se quitan los campos creados para evitar duplicaciones
            reboot_newPost.style.borderBottom = 'black 5px solid';

            const reboot_oldPost = document.getElementById('oldPost');
            reboot_oldPost.innerHTML = '';


            // Aqui se buscara todos los post del tema seleccionado con el ID
            const topicID = localStorage.getItem(`${topicClassName}-ID`);
            
            for (let i = parseInt(topicID); i >= 0; i--) {
                const listPost = localStorage.getItem(`${topicOpen.id}-${i}`);

                // Condicional para evitar errores a la hora de cargar un posts eliminado
                if (listPost !== null && listPost !== undefined) {
                    // Crear campos para desplegar al usuario y que pueda leer los posts
                    const view_oldPost = document.getElementById('oldPost');

                    const div_oldPost = document.createElement('div');
                    div_oldPost.setAttribute('class', 'view_oldPost');
                    div_oldPost.innerText = listPost;

                    const p_oldPost = document.createElement('p');
                    p_oldPost.setAttribute('class', 'p_oldPost');
                    p_oldPost.setAttribute('id', `${topicOpen.id}-${i}`);
                    p_oldPost.innerText = 'Eliminar Post';

                    const wrapper_oldPost = document.createElement('div');
                    wrapper_oldPost.setAttribute('class', 'wrapper_oldPost');
                    wrapper_oldPost.setAttribute('id', i);

                    wrapper_oldPost.appendChild(div_oldPost);
                    wrapper_oldPost.appendChild(p_oldPost);
                    view_oldPost.appendChild(wrapper_oldPost);

                }
            }
        }


        // Carga de botones para eliminar posts ya creados
        carga_oldPosts();
        function carga_oldPosts () {
            const del_oldPost = document.getElementsByClassName('p_oldPost');
            for (let i = 0; del_oldPost.length > i; i++) {
                const find_del_oldPost = document.getElementById(del_oldPost[i].id);
                
                find_del_oldPost.addEventListener('click', (e) => {
                    const name_oldTopic = del_oldPost[i].id.replace(/-[1-9]*/,'');
                    localStorage.removeItem(del_oldPost[i].id);
                    let id_wrapper = del_oldPost[i].id.replace(/[a-zA-Z]*-/,'');
                    const del_wrapperHTML = document.getElementById(id_wrapper);
                    del_wrapperHTML.innerHTML = '';
                    del_wrapperHTML.style.display = 'none';
                    mostrar_oldPosts(name_oldTopic);
                    carga_oldPosts();
                })
            }
        }

        // Se crean campos para escribir nuevos post en la columna de la derecha
        const section_newPost = document.getElementById('newPost');
        const rotulo_newPost = document.createElement('div');
        rotulo_newPost.setAttribute('id', 'rotulo_newPost');
        rotulo_newPost.innerHTML = `Tema:<br>${topicOpen.id}`;

        const textarea_newPost = document.createElement('textarea');
        textarea_newPost.setAttribute('id', 'text_newPost');
        textarea_newPost.setAttribute('class', topicOpen)

        const p_newPost = document.createElement('p');
        p_newPost.setAttribute('id', 'p_newPost');
        p_newPost.innerText = 'Enviar post';

        section_newPost.appendChild(rotulo_newPost);
        section_newPost.appendChild(textarea_newPost);
        section_newPost.appendChild(p_newPost);


        // Guardar el post que se haya escrito para el tema en concreto al pulsar sobre 'enviar post'
        const send_newPost = document.getElementById('p_newPost');
        send_newPost.addEventListener('click', (e) => {
            let post_textarea = document.getElementById('text_newPost');
            let post_text = post_textarea.value;

            if (post_text.length > 1) {
                let post_newTextarea = `${sessionStorage.getItem('userName')} ha posteado: ${post_text}`;
                let new_id = localStorage.getItem(`${topicOpen.id}-ID`);
                new_id++;
                localStorage.setItem(`${topicOpen.id}-ID`, new_id);
                localStorage.setItem(`${topicOpen.id}-${new_id}`, post_newTextarea);
                post_textarea.value = '';
                mostrar_oldPosts(topicOpen.id);
                setTimeout(() => {
                    carga_oldPosts();
                }, 1000);
            } else {
                post_textarea.setAttribute('placeholder', 'Debes escribir un post para poder mandarlo');
            }

        })
    })
};


