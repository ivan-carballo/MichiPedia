/*
Aqui iran las funciones para eliminar temas ya creados (Que no posts dentro de temas)
*/

// Onclick en el boton de eliminar tema para que carguen las funciones
const borrarTema = document.getElementById('delTopic');
borrarTema.addEventListener('click', (e) => {
    // Buscar los temas existentes
    let buscarTopics = localStorage.getItem('topics');
    let topicsArray = buscarTopics.substring(0, buscarTopics.length - 1);
    topicsArray = topicsArray.split(',');
    topicsArray.sort();

    // Funcion para cargar los temas en un desplegable
    cargarTopics()
    function cargarTopics() {
        const selectOption = document.getElementById('deleteTopic');
        const includeTopics = document.getElementById('crearTopic');
        const nameTopic = document.getElementById('nameTopic');
        const acceptTopic = document.getElementById('acceptTopic');
        const acceptDelete = document.getElementById('acceptDelete');
        includeTopics.style.margin = '10px 0';
        includeTopics.style.padding = '10px 0';

        if (includeTopics.style.display !== 'flex') {
            includeTopics.style.display = 'flex';
            nameTopic.style.display = 'none';
            acceptTopic.style.display = 'none';
            deleteTopic.style.display = 'initial';
            acceptDelete.style.display = 'initial';
        } else {
            includeTopics.style.display = 'none';
            deleteTopic.style.display = 'none';
            acceptDelete.style.display = 'none';
        }


        selectOption.innerHTML = '';
        for (let i = 1; topicsArray.length > i; i++) {
            const create_option = document.createElement('option')
            create_option.setAttribute('class', 'option_topics');
            create_option.setAttribute('id', topicsArray[i]);
            create_option.value = topicsArray[i];
            create_option.innerText = topicsArray[i];

            selectOption.appendChild(create_option);
            includeTopics.appendChild(selectOption);

            //create_pTopics.innerText = topicsArray[i];
        }
    }
});


// onclick en el boton eliminar dentro del boton 'Eliminar tema'
const secondDelete = document.getElementById('acceptDelete');
secondDelete.addEventListener('click', (e) => {
    // Sacar el nombre del tema seleccionado del desplegable
    const temaDesplegable = document.getElementById('deleteTopic');
    let temaSeleccion = document.getElementById(temaDesplegable['selectedOptions'][0].id);
    temaSeleccion = temaSeleccion.id;

    // Usar el nombre del tema para borrar todo lo que hay en localstorage asociado a dicho tema
    const cantidadID = localStorage.getItem(`${temaSeleccion}-ID`);
    for (let i = 0; parseInt(cantidadID) >= i; i++) {
        localStorage.removeItem(`${temaSeleccion}-${i}`);
    }
    localStorage.removeItem(`${temaSeleccion}-ID`);

    let delTopic = localStorage.getItem('topics');
    delTopic = delTopic.replace(`${temaSeleccion},`, '')
    localStorage.setItem('topics', delTopic);

    setTimeout(() => {
        window.location.reload();
    }, 200);

})