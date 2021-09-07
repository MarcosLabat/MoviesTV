import {mostrarPopus, crearNumeracion, limpiarHTML} from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    crearNumeracion('#cont_serie')
    dataSeriesPopu();
    const numeracionn = document.querySelectorAll('.numeracion p')
    numeracionn.forEach(num => num.addEventListener('click', obtenerDatos ))
})

const dataSeriesPopu = async (page) => {
    try {
        let pg;
        if(page !== undefined) pg = page
        else pg = 1
        //PETICION A SERIES MAS POPULARES, PAGINA 1
        const data = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=553d724b7e735d834773e11a226a9107&language=es&sort_by=popularity.desc&page=${pg}&timezone=America%2C%20Europe%2FSpain&include_null_first_air_dates=false&with_original_language=es%2Cen&with_watch_monetization_types=flatrate`);
        const dataJSON = await data.json()
        const dataSeries = await dataJSON.results;
        let nombrePeli1 = [];
        let idPeli1 = [];
        dataSeries.forEach(e => {
            nombrePeli1 = [...nombrePeli1, e.name,]
            idPeli1 = [...idPeli1, e.id,]
        })
        await mostrarPopus(dataSeries,'.contenedor__series','serie',nombrePeli1,idPeli1);
    } catch (error) {
        console.log(error)
    }
}

const obtenerDatos = (e) => {
    limpiarHTML('.contenedor__series')
    const numActivo = document.querySelector('.numeracion p.actual')
    if(e.target.classList.contains('actual')) e.target.classList.remove('actual')
    else{
        e.target.classList.add('actual')
        numActivo.classList.remove('actual')
    }
    const page = Number(e.target.dataset.page)
    dataSeriesPopu(page)
} 