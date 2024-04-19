// Aqui ira todo el codigo referente al formulario y el envio de mensajes



// Hacer getElementByID a todos los inputs
const delInputName = document.getElementById('inputName');
const delInputSurname = document.getElementById('inputSurname');
const delInputEmail = document.getElementById('inputEmail');
const delInputTextarea = document.getElementById('inputMessage');


// Funcion del boton 'Limpiar' que elimina todo lo escrito en los inputs
const buttonLimpiar = document.getElementById('buttonDelete'); 
buttonLimpiar.addEventListener('click', (e) => {
    delInputName.value = '';
    delInputSurname.value = '';
    delInputEmail.value = '';
    delInputTextarea.value = '';
})


// Funcion del boton 'Enviar' que manda el formulario al correo
const buttonEnviar = document.getElementById('buttonSend');
buttonEnviar.addEventListener('click', (e) => {
    // Aqui hacer los datos de envio de formulario
})