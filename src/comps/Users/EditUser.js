import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { connect, useSelector } from 'react-redux'
import MuiToolbar from '../MuiToolbar'
import utils from './userUtils'
import movieUtils from '../Movies/movieUtils'
import { Paper, Grid, Button, TextField, ButtonGroup, Checkbox, Divider, Container, Box } from '@material-ui/core'
import '../classes.css'

const EditUser = (props) => {
    const id = useSelector(state => state.editUser.id);
    const [user, setUser] = useState({});
    const [flag, setFlag] = useState(false);
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [sessionTimeout, setSessionTimeout] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [permissions, setPermissions] = useState([]);
    const [subsChecked, setSubsChecked] = useState(false);
    const [moviesChecked, setMoviesChecked] = useState(false);
    const [createSubs, setCreateSubs] = useState(false)
    const [updateSubs, setUpdateSubs] = useState(false)
    const [deleteSubs, setDeleteSubs] = useState(false)
    const [createMovies, setCreateMovies] = useState(false)
    const [updateMovies, setUpdateMovies] = useState(false)
    const [deleteMovies, setDeleteMovies] = useState(false)

    const addPermission = (permStr) => {
        let exist = -1;
        permissions.forEach((perm, index) => {
            if (perm == permStr) {
                exist = index
            }
        })
        if (exist == -1) {
            let arr = [...permissions]
            arr.push(permStr);
            if (permStr == "Create Subscriptions" || permStr == "Update Subscriptions" || permStr == "Delete Subscriptions") {
                if (!subsChecked) {
                    setSubsChecked(true);
                    arr.push("View Subscriptions");
                }
            }
            else if (permStr == "Create Movies" || permStr == "Update Movies" || permStr == "Delete Movies") {
                if (!moviesChecked) {
                    setMoviesChecked(true);
                    arr.push("View Movies");
                }
            }
            setPermissions(arr)
        }
        else {
            let arr = [...permissions];
            arr.splice(exist, 1);
            setPermissions(arr);
        }
    }

    const update = async () => {
        if (fname != "" && lname != "" && username != "" && typeof Number(sessionTimeout) == "number" && permissions.length > 0) {
            let user = {
                fname: fname,
                lname: lname,
                username: username,
                sessionTimeout: Number(sessionTimeout),
                permissions: permissions
            }
            let formattedUser = formatUser(user);
            await utils.updateUser(id, formattedUser);
            props.history.push('/usersManagement')
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
        let today = new Date(dateCreated);
        let options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        today = today.toLocaleDateString('en-US', options)
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

    const cancel = () => {
        let actionObj = {
            type: "EDITUSER",
            payload: { id: "" }
        }
        props.dispatch(actionObj);
        props.history.push('/usersManagement');
    }

    useEffect(() => {
        const getData = async () => {
            let data = await utils.getIndCompUserData(id);
            setUser(data);
            setFlag(true);
        }
        getData();
    }, [])

    useEffect(() => {
        const createUsersUI = () => {
            if (flag) {
                setFname(user.fname);
                setLname(user.lname);
                setUsername(user.username);
                setSessionTimeout(user.sessionTimeout / 60000);
                let formattedDate = movieUtils.formatDate(user.dateCreated);
                setDateCreated(formattedDate);
                let newPerms = [];
                user.permissions.forEach((perm) => {
                    if (perm == "View Subscriptions") {
                        newPerms.push(perm);
                        setSubsChecked(true)
                    }
                    else if (perm == "Create Subscriptions") {
                        newPerms.push(perm);
                        setCreateSubs(true);
                    }
                    else if (perm == "Update Subscriptions") {
                        newPerms.push(perm);
                        setUpdateSubs(true);
                    }
                    else if (perm == "Delete Subscriptions") {
                        newPerms.push(perm);
                        setDeleteSubs(true);
                    }
                    else if (perm == "View Movies") {
                        newPerms.push(perm);
                        setMoviesChecked(true);
                    }
                    else if (perm == "Create Movies") {
                        newPerms.push(perm);
                        setCreateMovies(true);
                    }
                    else if (perm == "Update Movies") {
                        newPerms.push(perm);
                        setUpdateMovies(true);
                    }
                    else if (perm == "Delete Movies") {
                        newPerms.push(perm);
                        setDeleteMovies(true);
                    }
                })
                setPermissions(newPerms);
            }
        }
        createUsersUI();
    }, [flag])


    return (
        <Container>
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <Grid container justify="center" style={{ paddingBottom: "50px" }} >
                    <Paper style={{ marginTop: "30px" }}>
                        <h3>Edit {user.username}</h3>
                        <TextField type="text" value={fname} label="First Name" onChange={e => setFname(e.target.value)} /> <br />
                        <TextField type="text" value={lname} label="Last Name" onChange={e => setLname(e.target.value)} /> <br />
                        <TextField type="text" value={username} label="Username" onChange={e => setUsername(e.target.value)} /> <br />
                        <TextField type="number" value={sessionTimeout} inputProps={{ min: "1" }} label="Session Timeout (Minutes)" onChange={e => setSessionTimeout(e.target.value)} /> <br />
                        <TextField type="date" value={dateCreated} label="Date Created" disabled InputProps={{ style: { color: "#acafb0" } }} InputLabelProps={{ style: { color: "#acafb0" } }} /><br /><br />
                        <b>Permissions: </b> <br /><br />
                        <Grid container justify="center" direction="row" alignItems="center" style={{ lineHeight: "8px" }}>
                            <Grid container xs={5} direction="column" justify="center" alignItems="flex-start">
                                <label><Checkbox value="View Subscriptions" checked={subsChecked} onChange={(e) => { setSubsChecked(!subsChecked); addPermission(e.target.value) }} />View Subscriptions</label><br />
                                <label><Checkbox value="Create Subscriptions" checked={createSubs} onChange={(e) => { setCreateSubs(!createSubs); addPermission(e.target.value) }} />Create Subscriptions</label><br />
                                <label><Checkbox value="Update Subscriptions" checked={updateSubs} onChange={(e) => { setUpdateSubs(!updateSubs); addPermission(e.target.value) }} />Update Subscriptions</label><br />
                                <label><Checkbox value="Delete Subscriptions" checked={deleteSubs} onChange={(e) => { setDeleteSubs(!deleteSubs); addPermission(e.target.value) }} />Delete Subscriptions</label><br />
                            </Grid>
                            <Divider orientation="vertical" xs={2} flexItem />
                            <Grid container xs={5} direction="column" justify="center" alignItems="flex-start" style={{ paddingLeft: "60px" }} >
                                <label><Checkbox value="View Movies" checked={moviesChecked} onChange={(e) => { setMoviesChecked(!moviesChecked); addPermission(e.target.value) }} />View Movies</label><br />
                                <label><Checkbox value="Create Movies" checked={createMovies} onChange={(e) => { setCreateMovies(!createMovies); addPermission(e.target.value) }} />Create Movies</label><br />
                                <label><Checkbox value="Update Movies" checked={updateMovies} onChange={(e) => { setUpdateMovies(!updateMovies); addPermission(e.target.value) }} />Update Movies</label><br />
                                <label><Checkbox value="Delete Movies" checked={deleteMovies} onChange={(e) => { setDeleteMovies(!deleteMovies); addPermission(e.target.value) }} />Delete Movies</label><br />
                            </Grid>
                        </Grid><br />
                        <ButtonGroup>
                            <Button onClick={cancel}>Cancel</Button>
                            <Button onClick={update}>Edit</Button>
                        </ButtonGroup><br /><br />
                    </Paper>
                </Grid>
            </Box>
        </Container>
    )
}

export default withRouter(connect()(EditUser))