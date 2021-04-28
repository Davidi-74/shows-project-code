import axios from 'axios'
const URL = "https://shows-server.herokuapp.com"
const localURL = "http://localhost:8000"

const getAll = async () => {
    let movies = await axios.get(`${URL}/movies/getAllMovies`);
    return movies.data;
}

const getAllIds = async () => {
    let ids = await axios.get(`${URL}/movies/getAllMoviesIDs`);
    return ids.data;
}

const getById = async (id) => {
    let movie = await axios.get(`${URL}/movies/getbyid/${id}`);
    return movie.data;
}

const createMovie = async (movie) => {
    let resp = await axios.post(`${URL}/movies/`, movie);
    return resp.data;
}

const deleteMovie = async (id) => {
    let resp = await axios.delete(`${URL}/movies/${id}`)
    return resp.data;
}

const formatDate = (date) => {
    let newDate = new Date(date).toLocaleDateString();
    let arr = newDate.split('/');
    if (arr[1] < 10) {
        arr[1] = "0" + arr[1];
    }
    if (arr[0] < 10) {
        arr[0] = "0" + arr[0];
    }
    let formattedDate = arr[2] + "-" + arr[0] + "-" + arr[1];

    return formattedDate;
}

const updateMovie = async (id, movie) => {
    let resp = await axios.put(`${URL}/movies/${id}`, movie);
    return resp.data;
}

const searchMovie = async (str) => {
    let ids = await axios.get(`${URL}/movies/search/${str}`)
    return ids.data;
}

const getNameById = async (id) => {
    let name = await axios.get(`${URL}/movies/getnamebyid/${id}`)
    return name.data;
}

const getNamesAndIds = async () => {
    let movies = await axios.get(`${URL}/movies/getNamesAndIds`);
    return movies.data
}

const getIdsByPage = async (page) => {
    let ids = await axios.get(`${URL}/movies/getMoviesByPage/${page}`)
    return ids.data;
}

const getPagesCount = async (page) => {
    let count = await axios.get(`${URL}/movies/getPagesCount`)
    return count.data;
}

export default {
    getAll, getAllIds, getById, createMovie, deleteMovie, formatDate, updateMovie,
    searchMovie, getNameById, getNamesAndIds, getIdsByPage, getPagesCount
}