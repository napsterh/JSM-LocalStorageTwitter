

//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweet = [];

// Event listeners
eventListener();

function eventListener() {
    //cuando se envia al formulario
    formulario.addEventListener('submit', agregarTweet);

    // //Borrar  tweet
    // listaTweets.addEventListener('click', borrarTweet);

    // //Contenido cargado
    // document.addEventListener('DOMContentLoaded', localStorageListo);

    // //Borrar  tweet
    // document.addEventListener('submit', borrarCampo);
}


//Functions
//Añadir tweet del formulario

function agregarTweet(e) {
    e.preventDefault();

    // // Leer valor de text area
    const tweet = document.querySelector('#tweet').value;
    console.log(tweet)

    //Validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio')
        return; //Evita que ejecute mas lineas de codigo
    }
    console.log('registrado')

    //     //Crear boton para eliminar
    //     const botonBorrar = document.createElement('a');
    //     botonBorrar.classList = 'borrar-tweet';
    //     botonBorrar.innerText = 'X';

    //     //Crear elemento y añadirle el contenido a la lista
    //     const li = document.createElement('li');
    //     li.innerText = tweet;
    //     //Añade el boton de borrar el tweet
    //     li.appendChild(botonBorrar);
    //     //Añade el tweet a la lista
    //     listaTweets.appendChild(li);

    //     //Añadir a local storage
    //     agregarTweetLocalStorage(tweet);
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

//Elimina el tweet
function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
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
    if(tweet !== null){
        let tweets;
        tweets = obtenerTweetsLocalStorage();
        //Añadir el nuevo tweet
        tweets.push(tweet);
        //Convertir de string a arreglo para local storage
        localStorage.setItem('tweets', JSON.stringify(tweets) );
    }
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


// Eliminar tweet de localStorage

function borrarTweetLocalStorage(tweet){
    let tweets, tweetBorrar;
    // Elimina la X de tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarCampo(){
    const campo = document.getElementById('tweet');
    if(campo !== null){
        campo.value = "";
    }
}