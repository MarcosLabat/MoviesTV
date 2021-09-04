document.addEventListener('DOMContentLoaded', () =>{
    datosSlide();
});

let posicion = 0;
const botonDerecha = document.querySelector('#right');
const botonIzquierda = document.querySelector('#left');
const contenedor = document.querySelector('#slider');
const titulo = document.createElement('H3');

const datosSlide = async () => {
    try {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=553d724b7e735d834773e11a226a9107&language=es')
        const dataTotal = await data.json()
        const dataNombre = await dataTotal.results
        await pelisPopu(dataNombre);
        let imagenes = [];
        for(const img of dataNombre){
            if(imagenes.length <= 10) imagenes = [...imagenes, [img.backdrop_path, img.title]]
            else {
                 mostrarImagenes(imagenes)
                return;
            };
        }
    } catch (error) {
        console.log(error)
    }
};

const mostrarImagenes = async (datos) => {
    const imagen = await datos.map(img => img)
    contenedor.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${imagen[posicion][0]}')`;
    titulo.innerHTML = imagen[posicion][1];
    titulo.classList.add('titulo');
    contenedor.appendChild(titulo);
    botonIzquierda.onclick = () => izquierda(imagen);
    botonDerecha.onclick = () => derecha(imagen);
    setInterval(() => {
        derecha(imagen)
    },4000);
}

const derecha = (imagen) => {
    if(posicion == 10) posicion = 0;
    else posicion++;
    contenedor.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${imagen[posicion][0]}')`;
    titulo.innerHTML = imagen[posicion][1];
}

const izquierda = (imagen) => {
    if(posicion == 0) posicion = 10;
    else posicion--;
    contenedor.style.backgroundImage = `url('https://image.tmdb.org/t/p/original/${imagen[posicion][0]}')`;
    titulo.innerHTML = imagen[posicion][1];
};
//TERMINA CODIGO DE SLIDER;
const pelisPopu = async (data) => {
    const carousel = document.querySelector('.carousel__lista')
    const path = location.pathname
    await data.forEach(peli => {
        const div = document.createElement('DIV');
        div.classList.add('carousel__elemento');

        const imagenPeli = document.createElement('IMG');
        imagenPeli.alt = `${peli.title}`;
        imagenPeli.src = `https://image.tmdb.org/t/p/w500/${peli.poster_path}`;
        imagenPeli.setAttribute('id', peli.id)

        const tituloPeli = document.createElement('P');
        tituloPeli.textContent = peli.title;

        const boton = document.createElement('BUTTON');
        boton.setAttribute('id', peli.id)
        const id = boton.getAttribute('id');
        boton.innerHTML = `<a href="detalle.html?id=${id}&pathname=${path}">Mas Información</a>`

        div.appendChild(imagenPeli);
        div.appendChild(tituloPeli);
        div.appendChild(boton);
        carousel.appendChild(div);
    })
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 2,
        slidesToScroll: 10,
        dots: '.carousel__indicadores',
        draggable: true,
        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 7,
                draggable: false,
              }
            },
            {
                breakpoint: 768,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 5,
                }
              }
          ]
    });
}


