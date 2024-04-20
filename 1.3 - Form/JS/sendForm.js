const user = '79.umaru@gmail.com';

const ElasticEmail = require('@elasticemail/elasticemail-client');
const client = ElasticEmail.ApiClient.instance;

const apikey = client.authentications['apikey'];
apikey.apiKey = '070F532089B514D17621034AF16D2AB90A2F334D83269FF9BC6A2A3B81FF1F8170BAB4C4C6890BA1BD6EE166591AFC93';

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
              Content: "<strong>Asunto de prueba de Michis<strong>"
          }
      ],
      From: user,
      Subject: "El segundo subjetc de mas abajo"
  }
};

const callback = (error, data, response) => {
  if (error) {
      console.error(error);
  } else {
      console.log('API called successfully.');
      console.log('Email sent.');
  }
};

emailsApi.emailsTransactionalPost(emailData, callback);