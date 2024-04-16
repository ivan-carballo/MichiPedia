Puedes utilizar la función `fetch()` de JavaScript para hacer una solicitud a una API y agregar un encabezado con la clave de la API. Aquí hay un ejemplo de cómo hacerlo:

```javascript
const apiKey = 'your_api_key_here';
const apiUrl = 'https://api.example.com/data';

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  }
})
.then(response => response.json())
.then(data => {
  console.log('Success!', data);
})
.catch((error) => {
  console.error('Error:', error);
});
```

En este ejemplo, sustituye `'your_api_key_here'` con la clave de la API proporcionada por la API y `'https://api.example.com/data'` con la URL de la API que deseas llamar. La función `fetch()` realiza una solicitud GET a la API y agrega el encabezado 'Authorization' con la clave de la API en formato JSON Web Token (JWT).

Si la solicitud es exitosa, el método `.then()` recibirá los datos en formato JSON y se imprimirá en la consola. Si ocurre un error, el método `.catch()` capturará el error y se imprimirá en la consola.