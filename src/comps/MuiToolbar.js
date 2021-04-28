import React, { useEffect, useState } from 'react';
import { useSelector, connect } from 'react-redux'
import { Toolbar, Button, AppBar, Box, Grid, ButtonGroup, Typography } from '@material-ui/core'
import TimerComp from './TimerComp'

const MuiToolbar = (props) => {
    const user = useSelector(state => state.user)
    const [UMButton, setUMButton] = useState(<span></span>);

    const isAdmin = () => {
        if (user.admin) {
            setUMButton(<Button onClick={() => props.history.push('/usersManagement')} style={{ lineHeight: "20px" }} style={{ width: "210px" }} className={UMButton}>Users Management</Button>)
        }
        else {
            setUMButton("")
        }
    }

    const loggedIn = () => {
        if (user.id == "") {
            logout();
            return false;
        }
        return true;
    }

    const logout = () => {
        let actionObj = { type: "LOGOUT" };
        props.dispatch(actionObj);
        props.history.push('/')
    }

    useEffect(() => {
        loggedIn();
        isAdmin();
    }, [])

    return (
        <div>
            <AppBar style={{ backgroundColor: "#393e46", paddingBottom: "2vh" }}>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid item xs={12}>
                        <h2 style={{ color: "#f7fbfc", marginBottom: "10px", fontFamily: "Helvetica" }}>TV Shows Subscriptions Site</h2>
                    </Grid>
                    <Grid item xs={12} container justify="center" alignItems="center">
                        <span style={{ color: "#f7fbfc" }}>Hello, {user.fname}</span>
                    </Grid>
                    <Grid item container xs={12} direction="row" >
                        <Grid item xs={2} />
                        <Grid item container justify="center" xs={8} >
                            <Box flex={1} display="flex" justifyContent="center" alignItems="center" >
                                <Toolbar>
                                    <ButtonGroup maxWidth="false" style={{ height: "50px" }}>
                                        <Button style={{ width: "210px" }} onClick={() => props.history.push('/movies/1')}>TV Shows</Button>&nbsp;
                                        <Button style={{ width: "210px" }} onClick={() => props.history.push('/subscriptions')}>Subscriptions</Button>&nbsp;
                                        {UMButton}
                                        <Button style={{ width: "210px" }} onClick={logout}>Logout</Button>
                                    </ButtonGroup>
                                </Toolbar>
                            </Box>
                        </Grid>
                        <Grid container justify="flex-end" alignItems="flex-end" style={{ paddingRight: "15px", marginBottom: "8px" }} xs={2} >
                            {loggedIn() && (<TimerComp history={props.history} />)}
                        </Grid>
                    </Grid>
                </Grid>
            </AppBar>
        </div >
    )
}

export default connect()(MuiToolbar)