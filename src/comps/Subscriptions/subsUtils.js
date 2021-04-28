import axios from 'axios'
const URL = "https://shows-server.herokuapp.com"
const localURL = "http://localhost:8000"

const getAllSubs = async () => {
    let subs = await axios.get(`${URL}/subs/`);
    return subs.data;
}

const getByMemberId = async (id) => {
    let subs = await axios.get(`${URL}/subs/getbymemberid/${id}`);
    if (subs == null) {
        return -1;
    }
    else {
        return subs.data
    }
}

const subscribe = async (sub) => {
    let resp = await axios.post(`${URL}/subs/`, sub);
    return resp.data;
}

export default { getByMemberId, subscribe }