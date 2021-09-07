import {mostrarPopus, crearNumeracion, limpiarHTML} from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    crearNumeracion('#cont_peli')
    dataPelisPopu()
    const numeracionn = document.querySelectorAll('.numeracion p')
    numeracionn.forEach(num => num.addEventListener('click', obtenerDatos ))
})

const dataPelisPopu = async (page) => {
    try {
        let pg;
        if(page !== undefined) pg = page
        else pg = 1
        //PETICION A PELICULAS MAS POPULARES, PAGINA 1
        const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=553d724b7e735d834773e11a226a9107&language=es&page=${pg}`);
        const dataJSON = await data.json()
        const dataSeries = await dataJSON.results;
        let nombrePeli = [];
        let idPeli = [];
        dataSeries.forEach(e => {
            nombrePeli = [...nombrePeli, e.title]
            idPeli = [...idPeli, e.id]
        })
        await mostrarPopus(dataSeries,'.contenedor__peliculas','pelicula',nombrePeli,idPeli);
    } catch (error) {
        console.log(error)
    }
}

const obtenerDatos = (e) => {
    limpiarHTML('.contenedor__peliculas')
    const numActivo = document.querySelector('.numeracion p.actual')
    if(e.target.classList.contains('actual')) e.target.classList.remove('actual')
    else{
        e.target.classList.add('actual')
        numActivo.classList.remove('actual')
    }
    const page = Number(e.target.dataset.page)
    dataPelisPopu(page)
}