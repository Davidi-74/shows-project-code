import React, { useEffect, useState } from 'react'
import utils from './userUtils'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { ButtonGroup, Button, Grid, Paper, Divider, Checkbox } from '@material-ui/core'
import { userDataPaperSmall, userDataPaperBig, innerDataPaper, disabledCheckboxIndUser } from '../materialUI'
import '../classes.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box'

const IndUser = (props) => {
    const [user, setUser] = useState({});
    const [flag, setFlag] = useState(false);
    const [dateCreated, setDateCreated] = useState("");
    const [permissions, setPermissions] = useState("");
    const [open, setOpen] = useState(false);

    const createUsersUI = () => {
        if (flag) {
            let dateCreated = new Date(user.dateCreated);
            dateCreated = dateCreated.toLocaleDateString('en-GB');
            setDateCreated(dateCreated);
            let permissions = "";
            user.permissions.forEach(perm => {
                let permFormat = perm.replace(/\s+/g, '');
                permFormat = permFormat[0].toLowerCase() + permFormat.slice(1);
                let newPerms = { ...permissions, [permFormat]: true };
                permissions = newPerms;
            });
            setPermissions(permissions);
        }
    }

    const deleteUser = async () => {
        await utils.deleteUser(props.id);
        props.deleted();
    }

    const editUser = () => {
        let actionObj = { type: "EDITUSER", payload: { id: props.id } }
        props.dispatch(actionObj);
        props.history.push('/edituser');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getData = async () => {
            let data = await utils.getIndCompUserData(props.id);
            setUser(data);
            setFlag(true);
        }
        getData();
    }, [])

    useEffect(() => {
        createUsersUI();
    }, [flag])

    const smallPaper = userDataPaperSmall();
    const bigPaper = userDataPaperBig();
    const innerPaper = innerDataPaper();
    const disabledCheckbox = disabledCheckboxIndUser();
    return (
        <div>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item={12} container justify="center">
                    <h3 style={{ marginBottom: "10px" }}>{user.username}</h3>
                </Grid>
                <Grid container item xs={12} justify="center">
                    <Divider style={{ width: "500px", height: "2px", marginBottom: "10px" }} />
                </Grid>
                <Grid item xs={12} direction="row" container justify="space-evenly">
                    <Paper className={smallPaper.root}>
                        <Grid container justify="center" textAlign="center">
                            <Grid item xs="12">
                                <h4 className="indUserHeaders">First Name</h4>
                            </Grid>
                            <Paper className={innerPaper.root}>
                                {user.fname}
                            </Paper>
                        </Grid>
                    </Paper>
                    <Paper className={smallPaper.root}>
                        <Grid container justify="center" textAlign="center">
                            <Grid item xs="12">
                                <h4 className="indUserHeaders">Last Name</h4>
                            </Grid>
                            <Paper className={innerPaper.root}>
                                {user.lname}
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} container direction="row" justify="space-evenly">
                    <Paper className={smallPaper.root}>
                        <Grid container justify="center" textAlign="center">
                            <Grid item xs="12">
                                <h4 className="indUserHeaders">Session Timeout</h4>
                            </Grid>
                            <Paper className={innerPaper.root}>
                                {user.sessionTimeout / 60000 + " Minutes"}
                            </Paper>
                        </Grid>
                    </Paper>
                    <Paper className={smallPaper.root}>
                        <Grid container justify="center" textAlign="center">
                            <Grid item xs="12">
                                <h4 className="indUserHeaders">Date Created</h4>
                            </Grid>
                            <Paper className={innerPaper.root}>
                                {dateCreated}
                            </Paper>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} container justify="center">
                    <Paper className={bigPaper.root}>
                        <h4>Permissions</h4>
                        <Grid container justify="center" direction="row" alignItems="center" style={{ lineHeight: "8px" }}>
                            <Grid container xs={5} direction="column" justify="flex-start" alignItems="flex-start" >
                                <label><Checkbox value="View Subscriptions" disabled className={disabledCheckbox.root} checked={permissions.viewSubscriptions ? true : false} />View Subscriptions</label><br />
                                <label><Checkbox value="Create Subscriptions" disabled className={disabledCheckbox.root} checked={permissions.createSubscriptions ? true : false} />Create Subscriptions</label><br />
                                <label><Checkbox value="Update Subscriptions" disabled className={disabledCheckbox.root} checked={permissions.updateSubscriptions ? true : false} />Update Subscriptions</label><br />
                                <label><Checkbox value="Delete Subscriptions" disabled className={disabledCheckbox.root} checked={permissions.deleteSubscriptions ? true : false} />Delete Subscriptions</label><br />
                            </Grid>
                            <Divider orientation="vertical" xs={2} flexItem />
                            <Grid container xs={5} direction="column" justify="center" alignItems="flex-start" style={{ paddingLeft: "10px" }}>
                                <label><Checkbox value="View Movies" disabled className={disabledCheckbox.root} checked={permissions.viewMovies ? true : false} />View TV Shows</label><br />
                                <label><Checkbox value="Create Movies" disabled className={disabledCheckbox.root} checked={permissions.createMovies ? true : false} />Create TV Shows</label><br />
                                <label><Checkbox value="Update Movies" disabled className={disabledCheckbox.root} checked={permissions.updateMovies ? true : false} />Update TV Shows</label><br />
                                <label><Checkbox value="Delete Movies" disabled className={disabledCheckbox.root} checked={permissions.deleteMovies ? true : false} />Delete TV Shows</label><br />
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid><br />
            <ButtonGroup>
                <Button onClick={editUser}>Edit</Button>&nbsp;
                <Button onClick={handleClickOpen}>Delete</Button>
            </ButtonGroup><br /><br />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <Box textAlign="left">
                    <DialogTitle id="alert-dialog-title">{`Delete ${user.username}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ color: "#f7fbfc" }}>
                            {`${user.username} will be deleted permanently and we will not be able to restore it.`}
                        </DialogContentText>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                            </Button>
                    <Button onClick={() => { handleClose(); deleteUser(); }} autoFocus>
                        Delete
                            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withRouter(connect()(IndUser))