import {mostrarPopus} from './funciones.js';

document.addEventListener('DOMContentLoaded', () => {
    dataPelisPopu()
})

const dataPelisPopu = async () => {
    try {
        //PETICION A PELICULAS MAS POPULARES, PAGINA 1
        const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=553d724b7e735d834773e11a226a9107&language=es&page=1&region=AR');
        const dataJSON = await data.json()
        const dataSeries = await dataJSON.results;
        let nombrePeli = [];
        let idPeli = [];
        dataSeries.forEach(e => {
            nombrePeli = [...nombrePeli, e.title]
            idPeli = [...idPeli, e.id]
        })
        await mostrarPopus(dataSeries,'.contenedor__peliculas','pelicula',nombrePeli,idPeli);

        const data2 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=553d724b7e735d834773e11a226a9107&language=es&page=1&region=ES');
        const dataJSON2 = await data2.json()
        const dataSeries2 = await dataJSON2.results;
        let nombrePeli2 = [];
        let idPeli2 = [];
        dataSeries2.forEach(e => {
            nombrePeli2 = [...nombrePeli2, e.title]
            idPeli2 = [...idPeli2, e.id]
        })
        await mostrarPopus(dataSeries2,'.contenedor__peliculas--espana','pelicula',nombrePeli2,idPeli2);

        const data3 = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=553d724b7e735d834773e11a226a9107&language=es&page=1&region=US');
        const dataJSON3 = await data3.json()
        const dataSeries3 = await dataJSON3.results;
        let nombrePeli3 = [];
        let idPeli3 = [];
        dataSeries3.forEach(e => {
            nombrePeli3 = [...nombrePeli3, e.title]
            idPeli3 = [...idPeli3, e.id]
        })
        await mostrarPopus(dataSeries3,'.contenedor__peliculas--eeuu','pelicula',nombrePeli3,idPeli3);
    } catch (error) {
        console.log(error)
    }
}