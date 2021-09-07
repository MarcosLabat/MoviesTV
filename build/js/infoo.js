import {infoPelis} from './funciones.js';
const parametrosURL= new URLSearchParams(window.location.search)
const id = parametrosURL.get('id');
const tipo = parametrosURL.get('pathname');
let url
if(tipo == '/series.html') url = `https://api.themoviedb.org/3/tv/${id}?api_key=553d724b7e735d834773e11a226a9107&language=es&append_to_response=account_states,alternative_titles,changes,credits,external_ids,images,keywords,lists,recommendations,release_dates,reviews,similar,translations,videos&include_image_language=en,es&include_video_language=en,es`
else if (tipo == '/peliculas.html' || tipo == '/index.html' || tipo == '/') url = `https://api.themoviedb.org/3/movie/${id}?api_key=553d724b7e735d834773e11a226a9107&language=es&append_to_response=account_states,alternative_titles,changes,credits,external_ids,images,keywords,lists,recommendations,release_dates,reviews,similar,translations,videos&include_image_language=en,es&include_video_language=en,es`

document.addEventListener('DOMContentLoaded', infoPelis(url))