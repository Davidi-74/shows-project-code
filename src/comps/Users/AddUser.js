import React, { useState } from 'react'
import utils from './userUtils'
import { Paper, Grid, Button, TextField, ButtonGroup, Checkbox, Divider } from '@material-ui/core'

const AddUser = (props) => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [subsChecked, setSubsChecked] = useState(false);
    const [moviesChecked, setMoviesChecked] = useState(false);

    const addPermission = (e) => {
        let exist = -1;
        permissions.forEach((perm, index) => {
            if (perm == e.target.value) {
                exist = index
            }
        })
        if (exist == -1) {
            let arr = [...permissions];
            arr.push(e.target.value);
            if (e.target.value == "Create Subscriptions" || e.target.value == "Update Subscriptions" || e.target.value == "Delete Subscriptions") {
                if (!subsChecked) {
                    setSubsChecked(true);
                    arr.push("View Subscriptions");
                }
            }
            else if (e.target.value == "Create Movies" || e.target.value == "Update Movies" || e.target.value == "Delete Movies") {
                if (!moviesChecked) {
                    setMoviesChecked(true);
                    arr.push("View Movies");
                }
            }
            setPermissions(arr);
        }
        else {
            let arr = [...permissions];
            arr.splice(exist, 1);
            setPermissions(arr);
        }
    }

    const save = async (e) => {
        e.preventDefault();
        if (fname != "" && lname != "" && username != "" && typeof Number(sessionTimeout) == "number" && permissions.length > 0) {
            let user = {
                fname: fname,
                lname: lname,
                username: username,
                sessionTimeout: Number(sessionTimeout),
                permissions: permissions
            }
            let formattedUser = formatUser(user);
            console.log(formattedUser);
            await utils.createUser(formattedUser);
            props.added();
        }
        else {
            alert("Please make sure you enter valid values!")
        }
    }

    const formatUser = (user) => {
        let formatFname = user.fname.charAt(0).toUpperCase() + user.fname.slice(1)
        let formatLname = user.lname.charAt(0).toUpperCase() + user.lname.slice(1)
        let formatST = user.sessionTimeout;
        formatST = formatST * 60000;
        let today = new Date();
        let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        today = today.toLocaleDateString('en-US', options);
        let formatted = {
            fname: formatFname,
            lname: formatLname,
            dateCreated: today,
            username: username,
            sessionTimeout: formatST,
            permissions: permissions
        }
        return formatted;
    }

    return (
        <div style={{ paddingBottom: "30px" }}>
            <Grid container justify="center">
                <Paper>
                    <h3>Add a New User</h3>
                    <form onSubmit={e => save(e)}>
                        <TextField type="text" label="First Name" onChange={e => setFname(e.target.value)} /> <br />
                        <TextField type="text" label="Last Name" onChange={e => setLname(e.target.value)} /> <br />
                        <TextField type="text" label="Username" onChange={e => setUsername(e.target.value)} /> <br />
                        <TextField type="number" inputProps={{ min: "1" }} label="Session Timeout (Minutes)" onChange={e => setSessionTimeout(e.target.value)} /> <br /><br />
                        <b>Permissions: </b> <br /><br />
                        <Grid container justify="center" direction="row" alignItems="center" style={{ lineHeight: "8px" }}>
                            <Grid container xs={5} direction="column" justify="flex-start" alignItems="flex-start">
                                <label><Checkbox value="View Subscriptions" checked={subsChecked} onChange={(e) => { setSubsChecked(!subsChecked); addPermission(e) }} />View Subscriptions</label><br />
                                <label><Checkbox value="Create Subscriptions" onChange={(e) => addPermission(e)} />Create Subscriptions</label><br />
                                <label><Checkbox value="Update Subscriptions" onChange={(e) => addPermission(e)} />Update Subscriptions</label><br />
                                <label><Checkbox value="Delete Subscriptions" onChange={(e) => addPermission(e)} />Delete Subscriptions</label><br />
                            </Grid>
                            <Divider orientation="vertical" xs={2} flexItem />
                            <Grid container xs={5} direction="column" justify="center" alignItems="flex-start" style={{ paddingLeft: "60px" }} >
                                <label><Checkbox value="View Movies" checked={moviesChecked} onChange={(e) => { setMoviesChecked(!moviesChecked); addPermission(e) }} />View TV Shows</label><br />
                                <label><Checkbox value="Create Movies" onChange={(e) => addPermission(e)} />Create TV Shows</label><br />
                                <label><Checkbox value="Update Movies" onChange={(e) => addPermission(e)} />Update TV Shows</label><br />
                                <label><Checkbox value="Delete Movies" onChange={(e) => addPermission(e)} />Delete TV Shows</label><br />
                            </Grid>
                        </Grid><br />
                        <ButtonGroup>
                            <Button onClick={() => props.added()}>Cancel</Button>
                            <Button type="submit">Save</Button>
                        </ButtonGroup><br /><br />
                    </form>
                </Paper>
            </Grid>
        </div>
    )
}

export default AddUser