//Variables
const listaTweets = document.getElementById('lista-tweets');

// Event listeners

eventListener();

function eventListener() {
    //cuando se envia al formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    //Borrar  tweet
    listaTweets.addEventListener('click', borrarTweet);
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

    //console.log(li);
}

function borrarTweet(e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        //console.log(e.target.parentElement.remove());
        alert('Tweet eliminado');
    }
}
