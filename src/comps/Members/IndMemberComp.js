import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux';
import membersUtils from './membersUtils'
import IndSubs from '../Subscriptions/IndSubsComp';
import { Grid, Paper, ButtonGroup, Button, Divider } from '@material-ui/core'
import { userDataPaperSmall, userDataPaperBig, innerDataPaper } from '../materialUI'
import '../classes.css'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Box from '@material-ui/core/Box'

const IndMember = (props) => {
    const user = useSelector(state => state.user)
    const [member, setMember] = useState({});
    const [flag, setFlag] = useState(false);
    const [subs, setSubs] = useState(-1)
    const [moviesIds, setMoviesIds] = useState([]);
    const [item, setItem] = useState("");
    const smallPaper = userDataPaperSmall();
    const bigPaper = userDataPaperBig();
    const innerPaper = innerDataPaper();
    const [open, setOpen] = useState(false);

    const getMember = async () => {
        let member = await membersUtils.getMemberByID(props.id);
        setMember(member.member)
        if (member.subs != null) {
            setMoviesIds(member.subs.movies)
        }
        setFlag(true)
    }

    const movieAdded = () => {
        setFlag(false)
        getMember();
    }

    const deleteMember = async () => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Delete Subscriptions") {
                currentPermit = true;
            }
        });
        if (currentPermit) {
            await membersUtils.deleteMember(props.id);
            props.deleted();
        }
        else {
            alert("This option is available only to users with the right permission!")
        }
    }

    const editMember = async () => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Update Movies") {
                currentPermit = true;
            }
        });
        if (currentPermit) {
            let actionObj = { type: "EDITMEMBER", payload: { id: props.id } };
            props.dispatch(actionObj);
            props.history.push('/editMember');
        }
        else {
            alert("This option is available only to users with the right permission!")
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createMemberUI = () => {
        if (flag) {
            let obj = (
                <Grid container direction="column"
                    justify="space-evenly"
                    alignItems="center">
                    <h3 xs={12} style={{ marginBottom: "10px" }}>{member.name}</h3>
                    <Divider xs={12} style={{ marginBottom: "10px", height: "2px", width: "500px" }} />
                    <Grid container item xs={12} justify="space-evenly">
                        <Paper xs={6} className={smallPaper.root}>
                            <Grid container justify="center" textAlign="center">
                                <Grid item xs={12}>
                                    <h4 className="indUserHeaders">Email</h4>
                                </Grid>
                                <Paper className={innerPaper.root} style={{ width: "auto", paddingLeft: "5px", paddingRight: "5px" }}>
                                    {member.email}
                                </Paper>
                            </Grid>
                        </Paper>
                        <Paper xs={6} className={smallPaper.root}>
                            <Grid container justify="center" textAlign="center">
                                <Grid item xs={12}>
                                    <h4 className="indUserHeaders">City</h4>
                                </Grid>
                                <Paper className={innerPaper.root}>
                                    {member.city}
                                </Paper>
                            </Grid>
                        </Paper>
                    </Grid><br />
                    <ButtonGroup xs={12}>
                        <Button onClick={editMember}>Edit</Button>
                        <Button onClick={handleClickOpen}>Delete</Button>
                    </ButtonGroup><br />
                    <IndSubs subs={moviesIds} memberId={props.id} added={movieAdded} />
                </Grid>
            )
            setItem(obj);
        }
    }

    useEffect(() => {
        getMember();
    }, [])

    useEffect(() => {
        createMemberUI();
    }, [flag])

    return (
        <div>
            {item}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <Box textAlign="left">
                    <DialogTitle id="alert-dialog-title">{`Delete ${member.name}?`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ color: "#f7fbfc" }}>
                            {`${member.name} will be deleted permanently and we will not be able to restore it.`}
                        </DialogContentText>
                    </DialogContent>
                </Box>
                <DialogActions>
                    <Button onClick={handleClose} >
                        Cancel
                            </Button>
                    <Button onClick={() => { handleClose(); deleteMember(); }} autoFocus>
                        Delete
                            </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withRouter(connect()(IndMember))
