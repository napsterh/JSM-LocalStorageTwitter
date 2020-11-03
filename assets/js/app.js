//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event listeners
eventListener();


function eventListener() {
    //cuando se envia al formulario
    formulario.addEventListener('submit', agregarTweet);

    // //Borrar  tweet
    listaTweets.addEventListener('click', borrarTweet);

    // Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];

        console.log(tweets);

        crearHTML();
    });
}


//FUNCTIONS
//Añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();

    // // Leer valor de text area
    const tweet = document.querySelector('#tweet').value;

    //Validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return; //Evita que ejecute mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }

    //Agregando el arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();

}


    //Muestra un listado de los tweets
 function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet => {

            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'Eliminar';

            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //Crear el HTML
            const li = document.createElement('li');

            //Añadir el texto
            li.innerText = tweet.tweet;

            //Asignar el boton
            li.appendChild(btnEliminar)

            //Insertando en el HTML
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
 }


 //Agrega los tweets actuales a localStorage
 function sincronizarStorage() {
     localStorage.setItem('tweets', JSON.stringify(tweets));
 }


 //Limpiar elementos
 function limpiarHTML() {
     while( listaTweets.firstChild ){
        listaTweets.removeChild(listaTweets.firstChild);
     }
 }


//Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el contenido
    const contenido = document.querySelector('#contenido')
    contenido.appendChild(mensajeError);

    //Elimina la alerta despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}


//Eliminar un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}