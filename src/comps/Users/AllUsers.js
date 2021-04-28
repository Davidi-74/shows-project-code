import React, { useEffect, useState } from 'react'
import utils from './userUtils'
import IndUser from './IndUserComp'
import { useSelector } from 'react-redux'
import { Paper, Grid } from '@material-ui/core'

const AllUsers = (props) => {
    const user = useSelector(state => state.user)
    const [ids, setIds] = useState([])
    const [items, setItems] = useState("");

    const getData = async () => {
        let ids = await utils.getAllUsersIDs();
        setIds(ids);
    }

    const userDeleted = () => {
        getData();
    }

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "View Subscriptions") {
                currentPermit = true;
            }
            else {
                let item = <div>
                    <h4>We're Sorry!</h4>
                    <h4>This page is visible only to users with the right permission</h4>
                </div>;
                setItems(item);
            }
        });
        if (currentPermit) {
            getData();
        }
    }, [])

    useEffect(() => {
        let items = ids.map((id, index) => {
            return (
                <Paper key={"userPaper" + index} style={{ padding: 20, paddingTop: 0 }}>
                    <IndUser id={id} key={"user" + index} deleted={userDeleted} edit={() => { props.edited() }} />
                </Paper>
            )
        })
        setItems(items);
    }, [ids])

    return (
        <div style={{ paddingBottom: "30px" }}>
            <Grid container direction="row"
                justify="space-evenly"
                alignItems="center">
                {items}
            </Grid>
        </div>
    )
}

export default AllUsers