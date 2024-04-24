// Aqui ira todo el codigo referente al formulario y el envio de mensajes


// Hacer getElementByID a todos los inputs
const delInputName = document.getElementById('inputName');
const delInputSurname = document.getElementById('inputSurname');
const delInputEmail = document.getElementById('inputEmail');
const delInputTextarea = document.getElementById('inputMessage');
const rotuloSend = document.getElementById('rotulo_form');
const rotuloEnviar = document.getElementById('rotulo_form');


// Funcion del boton 'Limpiar' que elimina todo lo escrito en los inputs
const buttonLimpiar = document.getElementById('buttonDelete'); 
buttonLimpiar.addEventListener('click', (e) => {
    delInputName.value = '';
    delInputSurname.value = '';
    delInputEmail.value = '';
    delInputTextarea.value = '';

    rotuloEnviar.innerText = 'Rellene el siguiente formulario para hacernos llegar su mensaje.';
    rotuloEnviar.style.color = 'black';
    rotuloEnviar.style.fontSize = '2rem';
})


// Funcion para cuando se pulse el boton de enviar mail
const buttonEnviar = document.getElementById('buttonSend');
buttonEnviar.addEventListener('click', (e) => {
    let contenidoTextarea = delInputTextarea.value;
    rotuloEnviar.style.fontSize = '5rem';
    rotuloEnviar.style.marginBottom = '0';
    // Condicionales para evitar que se rellenen mal los campos
    if (delInputName.value == '' || delInputSurname.value == '' || contenidoTextarea == '') {
        rotuloEnviar.innerText = 'Debe rellenar todos los campos';
        rotuloEnviar.style.color = 'red';
        rotuloEnviar.style.fontSize = '5rem';
    } else if (delInputEmail.value == '' || !delInputEmail.value.includes('@') || !delInputEmail.value.includes('.')) {
        rotuloEnviar.innerText = 'Debe escribir correctamente la direccion de email';
        rotuloEnviar.style.color = 'red';
        rotuloEnviar.style.fontSize = '5rem';
    } else if (contenidoTextarea.length < 5) {
        rotuloEnviar.innerText = 'Su mensaje es demasiado corto';
        rotuloEnviar.style.color = 'red';
        rotuloEnviar.style.fontSize = '5rem';
    } else {
        rotuloEnviar.innerText = 'Su mensaje ha sido enviado';
        rotuloEnviar.style.color = 'green';
        rotuloEnviar.style.fontSize = '5rem';
    }
});
