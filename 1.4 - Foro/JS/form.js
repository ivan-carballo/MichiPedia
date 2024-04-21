// Aqui ira todo el codigo referente al formulario y el envio de mensajes
const user = '79.umaru@gmail.com';

const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications['apikey'];
apikey.apiKey = '070F532089B514D17621034AF16D2AB90A2F334D83269FF9BC6A2A3B81FF1F8170BAB4C4C6890BA1BD6EE166591AFC93';




// Hacer getElementByID a todos los inputs
const delInputName = document.getElementById('inputName');
const delInputSurname = document.getElementById('inputSurname');
const delInputEmail = document.getElementById('inputEmail');
const delInputTextarea = document.getElementById('inputMessage');
const rotuloSend = document.getElementById('rotulo_form');


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
                Content: `Mensaje entrante:<br>`
            }
        ],
        From: user,
        Subject: `Mensaje de desde MichiPedia`
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
});