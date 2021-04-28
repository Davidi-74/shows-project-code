import axios from 'axios'
import subsUtils from '../Subscriptions/subsUtils'
const URL = "https://shows-server.herokuapp.com"
const localURL = "http://localhost:8000"

const getAllMembers = async () => {
    let members = await axios.get(`${URL}/members/getAllMembers`);
    return members.data;
}

const getAllMembersIDs = async () => {
    let ids = await axios.get(`${URL}/members/getMembersIDs`)
    return ids.data;
}

const getMemberByID = async (id) => {
    let member = await axios.get(`${URL}/members/getById/${id}`);
    let subs = await subsUtils.getByMemberId(id);
    let obj = {
        member: member.data,
        subs: subs
    }
    return obj;
}

const createMember = async (member) => {
    let resp = await axios.post(`${URL}/members/`, member);
    return resp.data;
}

const deleteMember = async (id) => {
    let resp = await axios.delete(`${URL}/members/${id}`);
    return resp.data
}

const updateMember = async (id, member) => {
    let resp = await axios.put(`${URL}/members/${id}`, member);
    return resp.data;
}



export default { getAllMembers, getAllMembersIDs, getMemberByID, createMember, deleteMember, updateMember }