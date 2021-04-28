import axios from 'axios'
import subsUtils from '../Subscriptions/subsUtils'

const getAllMembers = async () => {
    let members = await axios.get("http://localhost:8000/members/getAllMembers");
    return members.data;
}

const getAllMembersIDs = async () => {
    let ids = await axios.get("http://localhost:8000/members/getMembersIDs")
    return ids.data;
}

const getMemberByID = async (id) => {
    let member = await axios.get(`http://localhost:8000/members/getById/${id}`);
    let subs = await subsUtils.getByMemberId(id);
    let obj = {
        member: member.data,
        subs: subs
    }
    return obj;
}

const createMember = async (member) => {
    let resp = await axios.post("http://localhost:8000/members/", member);
    return resp.data;
}

const deleteMember = async (id) => {
    let resp = await axios.delete(`http://localhost:8000/members/${id}`);
    return resp.data
}

const updateMember = async (id, member) => {
    let resp = await axios.put(`http://localhost:8000/members/${id}`, member);
    return resp.data;
}



export default { getAllMembers, getAllMembersIDs, getMemberByID, createMember, deleteMember, updateMember }