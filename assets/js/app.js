

//Variables
const listaTweets = document.getElementById('lista-tweets');

// Event listeners
eventListener();

function eventListener() {
    //cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar  tweet
    listaTweets.addEventListener('click', borrarTweet);

    //Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Functions
//Añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();
    // Leer valor de text area
    const tweet = document.getElementById('tweet').value;
    //Crear boton para eliminar
    const botonBorrar = document.createElement('a');
    botonBorrar.classList = 'borrar-tweet';
    botonBorrar.innerText = 'X';

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    //Añade el boton de borrar el tweet
    li.appendChild(botonBorrar);
    //Añade el tweet a la lista
    listaTweets.appendChild(li);

    //Añadir a local storage
    agregarTweetLocalStorage(tweet);

}

//Elimina el tweet
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        //console.log(e.target.parentElement.remove());
        alert('Tweet eliminado');
    }
}

// Mostrar datos de localStorage en la lista

function localStorageListo(){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    //console.log(tweets);
    
    tweets.forEach(function(tweet){
        //Crear boton para eliminar
        const botonBorrar = document.createElement('a');
        botonBorrar.classList = 'borrar-tweet';
        botonBorrar.innerText = 'X';

        //Crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        //Añade el boton de borrar el tweet
        li.appendChild(botonBorrar);
        //Añade el tweet a la lista
        listaTweets.appendChild(li);
    });
}


//Agrega tweet a LocalStorage
function agregarTweetLocalStorage(tweet){
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    //Añadir el nuevo tweet
    tweets.push(tweet);
    //Convertir de string a arreglo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );

}

// Comprobar que existe elementos en localstorage, retorna un arreglo
function obtenerTweetsLocalStorage(){
    let tweets;
    //Revisar valores de local storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}
