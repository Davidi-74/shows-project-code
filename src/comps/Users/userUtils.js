import axios from 'axios'
const URL = "https://d74-users-server.herokuapp.com/users";
const localURL = "http://localhost:8001/users/";

const updateUser = async (id, user) => {
    let resp = await axios.put(`${URL}/${id}`, user);
    return resp.data;
}

const checkLogin = async (username, pwd) => {
    let valid = await axios.get(`${URL}/checkLogin/${username}/${pwd}`);
    return valid.data;
}

const userCreatedByAdmin = async (un, pwd) => {
    let resp = await axios.get(`${URL}/createdByAdmin/${un}/${pwd}`)
    return resp.data
}

const getFname = async (id) => {
    let fname = await axios.get(`${URL}/getFname/${id}`)
    return fname.data;
}

const getLoginData = async (id) => {
    let user = await axios.get(`${URL}/getLoginData/${id}`)
    return user.data;
}

const getAllUsersData = async () => {
    let users = await axios.get(`${URL}/getAllUsersData`)
    return users.data;
}

const getIndCompUserData = async (id) => {
    let user = await axios.get(`${URL}/getIndCompUserData/${id}`);
    return user.data;
}

const createUser = async (user) => {
    let resp = await axios.post(`${URL}/`, user);
    return resp.data;
}

const deleteUser = async (id) => {
    let resp = await axios.delete(`${URL}/${id}`);
    return resp.data;
}

const getAllUsersIDs = async () => {
    let ids = await axios.get(`${URL}/getAllUsersIDs`)
    return ids.data;
}

export default {
    checkLogin, userCreatedByAdmin, updateUser, getFname,
    getLoginData, getAllUsersData, createUser, getIndCompUserData,
    deleteUser, getAllUsersIDs
}