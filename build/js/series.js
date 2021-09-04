import {mostrarPopus} from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    dataSeriesPopu();
})

const dataSeriesPopu = async () => {
    try {
        //PETICION A SERIES MAS POPULARES, PAGINA 1
        const data = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=553d724b7e735d834773e11a226a9107&language=es&sort_by=popularity.desc&page=1&timezone=America%2C%20Europe%2FSpain&include_null_first_air_dates=false&with_original_language=es%2Cen&with_watch_monetization_types=flatrate');
        const dataJSON = await data.json()
        const dataSeries = await dataJSON.results;
        let nombrePeli1 = [];
        let idPeli1 = [];
        dataSeries.forEach(e => {
            nombrePeli1 = [...nombrePeli1, e.name,]
            idPeli1 = [...idPeli1, e.id,]
        })
        //PETICION A SERIES MAS POPULARES, PAGINA 2
        const data2 = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=553d724b7e735d834773e11a226a9107&language=es&sort_by=popularity.desc&page=2&timezone=America%2C%20Europe%2FSpain&include_null_first_air_dates=false&with_original_language=es%2Cen&with_watch_monetization_types=flatrate')
        const dataJSON2 = await data2.json();
        const dataSeries2 = await dataJSON2.results;
        let nombrePeli2 = [];
        let idPeli2 = [];
        dataSeries2.forEach(e => {
            nombrePeli2 = [...nombrePeli2, e.name];
            idPeli2 = [...idPeli2, e.id,]
        })

        await mostrarPopus(dataSeries,'.contenedor__series','serie',nombrePeli1,idPeli1);
        await mostrarPopus(dataSeries2,'.contenedor__series','serie',nombrePeli2,idPeli2);
    } catch (error) {
        console.log(error)
    }
}
