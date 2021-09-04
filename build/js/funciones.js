export const mostrarPopus = async (data, cont, clase, nombre,identificador) => {
    const contenedor = await document.querySelector(cont);
    const hijos = await contenedor.children
    const datos = await nombre
    const datosId = await identificador
    const path = location.pathname
    await data.forEach((serie,i) => {
        const {poster_path} = serie
        if(poster_path){
        const div = document.createElement('DIV');
        div.classList.add(clase);

        const img = document.createElement('IMG')
        img.alt = 'PORTADA DE LA SERIE';
        img.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;

        const nombre = document.createElement('P');
        nombre.textContent = datos[i];

        const boton = document.createElement('BUTTON');
        boton.classList.add('boton-info')
        boton.setAttribute('id', `${datosId[i]}`)
        const id = boton.getAttribute('id');
        boton.innerHTML = `<a href="detalle.html?id=${id}&pathname=${path}">Mas Información</a>` 


        div.appendChild(img)
        div.appendChild(nombre)
        div.appendChild(boton)

        contenedor.appendChild(div)
        if(hijos.length > 20){
            div.classList.add('ocultar')
            div.setAttribute('id', 'contenido-oculto');
        }
        }
    });
    if(hijos.length > 21){
        mostrarMasContenido();
    }
}

const mostrarMasContenido = () => {
    const oculto = document.querySelectorAll('#contenido-oculto');
    const botonVerMas = document.querySelector('#boton-vermas');
    botonVerMas.addEventListener('click', () => {
        oculto.forEach(peli => {
            if(peli.classList.contains('ocultar')){
                peli.classList.remove('ocultar');
                peli.classList.add('mostrar');
                botonVerMas.remove();
            }
        })
       
    })
}

export const infoPelis = async (url) => {
    try {
        const data = await fetch(url)
        const dataSerie = await data.json()
        mostrarInfo(dataSerie);
    } catch (error) {
        console.log(error)
    }
}

const mostrarInfo = async (data) => {
     const {backdrop_path, poster_path, name, overview, first_air_date,genres,number_of_seasons, number_of_episodes,origin_country,vote_average,vote_count,release_date,title} = data;
    const {results} = data.videos;
    const contenedorImg = document.querySelector('#img');
    const infoImg = document.querySelector('.info__img');
    const infoTxt = document.querySelector('.info__texto');
    const trailer = document.querySelector('#trailers');
    const fragmento = document.createDocumentFragment();

    contenedorImg.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${backdrop_path}')`;
    
    //crear img para el poster path
    const img = document.createElement('IMG')
    img.src = `https://image.tmdb.org/t/p/original/${poster_path}`;
    infoImg.appendChild(img)

    //Nombre
    const nombre = document.createElement('H2');
    nombre.classList.add('info__nombre');
    if(name) nombre.textContent = name;
    if(title) nombre.textContent = title;

    const desc = document.createElement('H4');
    desc.textContent = overview;
    desc.classList.add('info__desc')

    const fecha = document.createElement('P');
    if(first_air_date) fecha.innerHTML = `Fecha de lanzamiento: <span>${first_air_date}</span>`;
    else if(release_date) fecha.innerHTML = `Fecha de lanzamiento: <span>${release_date}</span>`;

    const contGeneros = document.createElement('DIV');
    contGeneros.classList.add('info__generos');

    const genero = document.createElement('H3')
    genero.textContent = 'Generos:'

    contGeneros.appendChild(genero)

    genres.forEach(g => {
        const generoNombre = document.createElement('H4');
        generoNombre.textContent = g.name;
        contGeneros.appendChild(generoNombre)
    })
    
    const votos = document.createElement('P');
    const valoracion = Math.ceil(vote_average)
    votos.innerHTML = `Valoracion: <span>${valoracion}/10</span>`;

    const cantidadVotos = document.createElement('P');
    cantidadVotos.innerHTML = `Recuento de votos: <span>${vote_count}</span>`;

    const divTrailer = document.createElement('DIV');
    divTrailer.classList.add('info__trailers');

    results.forEach(video => {
        const hijo = divTrailer.childNodes
        if(hijo.length <= 3){
            const contVideo = document.createElement('DIV');
            contVideo.innerHTML = `<iframe class="video" src="https://www.youtube.com/embed/${video.key}" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            divTrailer.appendChild(contVideo);
        }
        else{
            return;
        }
    })
    

    fragmento.appendChild(nombre)
    fragmento.appendChild(desc)
    fragmento.appendChild(fecha)
    fragmento.appendChild(contGeneros)
    if(number_of_seasons){
        const temporadas = document.createElement('P');
        temporadas.innerHTML = `Cantidad de temporadas: <span>${number_of_seasons}</span>`
        fragmento.appendChild(temporadas)
    }
    if(number_of_episodes){
        const episodios = document.createElement('P');
        episodios.innerHTML = `Cantidad de episodios: <span>${number_of_episodes}</span>`;
        fragmento.appendChild(episodios)
    }
    if(origin_country){
        const pais = document.createElement('P');
        pais.innerHTML = `País de origen: <span>${origin_country}</span>`;
        fragmento.appendChild(pais)
    }
    fragmento.appendChild(votos)
    fragmento.appendChild(cantidadVotos)

    infoTxt.appendChild(fragmento)
    trailer.appendChild(divTrailer)
    sacarLoad();
}

const sacarLoad = () => {
    const spinner = document.querySelector('#spinner')
    const contenedor = document.querySelector('.mostrar')
  
    spinner.style.display = 'none';
  
    contenedor.classList.remove('ocultar');
    contenedor.classList.add('mostrar')
  }