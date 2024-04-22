# Michi Pedia

Web que recoge de *https://api-ninjas.com/api/cats* un listado de las razas de gato existentes y proporciona varios datos basicos incluyendo una imagen de dicha raza.

Tambien da la posibilidad de gestionar razas concretas como favoritas y tener un listado en formato card mas sencillo de usar.

Cuenta con un foro de discusión para usuarios registrados, asi como una sección de inicio de usuario y creación de usuarios nuevos que cuenta con encriptacion sha256 para los passwords.

También hay un formulario de contacto para poder enviar un mensaje al webmaster.

De forma adicional, en la pagina principal hay un generador automatico de imagenes y datos random sobre felinos cada 30 segundos.

Hay varias versiones creadas:
- 1.0 - API: Se usan multiples llamadas API para poder tener la informacion
- 1.2 - Localstorage: Se hace una unica llamada inicial al cargar index.html y se guarda en localstorage y pasa a gestionarse desde ahi.
- 1.3 - Formulario: Se añade una pagina de contacto para que los usuarios puedan mandar mensajes al personal de la web.
- 1.4 - Foro de discusion con login: Se añade un foro de discusion para que los usuarios puedan mandarse preguntas, dudas o mensajes relacionados con los michis, para acceder se necesita crear un usuario y password
