import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndMember from './IndMemberComp'
import membersUtils from './membersUtils'
import { Grid, Paper } from '@material-ui/core'

const AllMembers = (props) => {
    const user = useSelector(state => state.user)
    const [ids, setIds] = useState([])
    const [items, setItems] = useState("");
    const [notice, setNotice] = useState("");

    const getIds = async () => {
        let ids = await membersUtils.getAllMembersIDs();
        setIds(ids);
    }

    const createMembersUI = () => {
        let items = ids.map((id, index) => {
            return (
                <Paper key={"memberPaper" + index} >
                    <IndMember key={"member" + index} id={id} deleted={getIds} />
                </Paper >
            )
        })
        setItems(items)
    }

    useEffect(() => {
        createMembersUI();
    }, [ids])

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "View Subscriptions") {
                currentPermit = true;
            }
        });
        if (currentPermit) {
            getIds();
        }
        else {
            let item = <div>
                <h4>We're Sorry!</h4>
                <h4>This page is visible only to users with the right permission</h4>
            </div>;
            setNotice(item);
        }
    }, [])

    return (
        <div style={{ paddingBottom: "30px" }}>
            <Grid container justify="space-evenly" alignItems="center" direction="column">
                {items}
                {notice}
            </Grid>
        </div>
    )
}

export default AllMembers