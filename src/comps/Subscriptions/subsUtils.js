import axios from 'axios'

const getAllSubs = async () => {
    let subs = await axios.get("http://localhost:8000/subs/");
    return subs.data;
}

const getByMemberId = async (id) => {
    let subs = await axios.get(`http://localhost:8000/subs/getbymemberid/${id}`);
    if (subs == null) {
        return -1;
    }
    else {
        return subs.data
    }
}

const subscribe = async (sub) => {
    let resp = await axios.post("http://localhost:8000/subs/", sub);
    return resp.data;
}

export default { getByMemberId, subscribe }