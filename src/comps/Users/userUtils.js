import axios from 'axios'
const PORT = "https://d74-users-server.herokuapp.com/users";
const localPort = "http://localhost:8001/users/";

const updateUser = async (id, user) => {
    let resp = await axios.put(`${PORT}/${id}`, user);
    return resp.data;
}

const checkLogin = async (username, pwd) => {
    let valid = await axios.get(`${PORT}/checkLogin/${username}/${pwd}`);
    return valid.data;
}

const userCreatedByAdmin = async (un, pwd) => {
    let resp = await axios.get(`${PORT}/createdByAdmin/${un}/${pwd}`)
    return resp.data
}

const getFname = async (id) => {
    let fname = await axios.get(`${PORT}/getFname/${id}`)
    return fname.data;
}

const getLoginData = async (id) => {
    let user = await axios.get(`${PORT}/getLoginData/${id}`)
    return user.data;
}

const getAllUsersData = async () => {
    let users = await axios.get(`${PORT}/getAllUsersData`)
    return users.data;
}

const getIndCompUserData = async (id) => {
    let user = await axios.get(`${PORT}/getIndCompUserData/${id}`);
    return user.data;
}

const createUser = async (user) => {
    let resp = await axios.post(`${PORT}/`, user);
    return resp.data;
}

const deleteUser = async (id) => {
    let resp = await axios.delete(`${PORT}/${id}`);
    return resp.data;
}

const getAllUsersIDs = async () => {
    let ids = await axios.get(`${PORT}/getAllUsersIDs`)
    return ids.data;
}

export default {
    checkLogin, userCreatedByAdmin, updateUser, getFname,
    getLoginData, getAllUsersData, createUser, getIndCompUserData,
    deleteUser, getAllUsersIDs
}