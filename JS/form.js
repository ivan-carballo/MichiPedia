// Aqui ira todo el codigo referente al formulario y el envio de mensajes
/* import require from '/require';
import { apiKey_mail, user } from './API.js';



const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications['apikey'];
apikey.apiKey = apiKey_mail; */



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


// Funcion del boton 'Enviar' que manda el formulario al correo
/* const buttonEnviar = document.getElementById('buttonSend');
buttonEnviar.addEventListener('click', (e) => {
    const emailsApi = new ElasticEmail.EmailsApi();

    const emailData = {
    Recipients: {
        To: [user]
    },
    Content: {
        Body: [
            {
                ContentType: "HTML",
                Charset: "utf-8",
                Content: `Mensaje entrante:<br>${delInputTextarea.value}<br> Contestar a: ${delInputEmail}`
            }
        ],
        From: user,
        Subject: `Mensaje de ${delInputName.value} ${inputSurname.value} desde MichiPedia`
    }
    };

    const callback = (error, data, response) => {
    if (error) {
        rotuloSend.innerHTML = 'El mensaje no se ha podido entregar';
        console.error(error);
    } else {
        rotuloSend.innerHTML = 'El mensaje ha sido enviado correctamente';
        console.log('API called successfully.');
        console.log('Email sent.');
    }
    };
    emailsApi.emailsTransactionalPost(emailData, callback);
}); */