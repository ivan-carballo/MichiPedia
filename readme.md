# Michi Pedia

Web que recoge de *https://api-ninjas.com/api/cats* un listado de las razas de gato existentes y proporciona varios datos basicos incluyendo una imagen de dicha raza.

Tambien da la posibilidad de gestionar razas concretas como favoritas y tener un listado en formato card mas sencillo de usar.

De forma adicional, en la pagina principal hay un generador automatico de imagenes y datos random sobre felinos cada 30 segundos.

Hay dos versiones creadas:
#1.0 - API: Se usan multiples llamadas API para poder tener la informacion
#1.2 - Localstorage: Se hace una unica llamada inicial al cargar index.html y se guarda en localstorage y pasa a gestionarse desde ahi.