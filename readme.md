# Michi Pedia

Web que recoge de *https://api-ninjas.com/api/cats* un listado de las razas de gato existentes y proporciona varios datos basicos incluyendo una imagen de dicha raza.

Admite la gestion razas concretas como favoritas y tener un listado en formato card mas sencillo de usar.

Cuenta con un foro de discusión para usuarios registrados, asi como una sección de inicio de usuario y creación de usuarios nuevos que cuenta con encriptacion sha256 para los passwords.

También hay un formulario de contacto para poder enviar un mensaje al webmaster.

A modo de entretenimiento hay incluido un pequeño test de 8 preguntas en el que calcula que raza de gato es la mas cercana a ti, dando una pequeña description y una imagen

De forma adicional, en la pagina principal hay un generador automatico de imagenes y datos random sobre felinos cada 30 segundos.

En la web existen 5 APIs diferentes, la principal para recoger todas las razas de gatos, una que proporciona una imagen aleatoria relacionada con gatos, una que da un dato aleatorio relacionado con gatos, una de traduccion para pasar el dato de ingles a español y otra de encriptacion de textos que uso para el login y creacion de usuarios.

De todas ellas, la unica que necesita una ApiKey es la principal para tener todas las razas de gatos, esta ApiKey se consigue haciendose un usuario en la web "https://api-ninjas.com/api/cats" y tiene un plan gratuito que ofrece 10.000 llamadas al mes. Esta ApiKey tiene que guardarse en ./JS/API.js. La exportancion e importacion necesaria ya estan creadas.
