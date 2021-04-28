import React, { useState } from 'react'
import utils from './Users/userUtils'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Container, TextField, Button } from '@material-ui/core'
import './classes.css'
import Paper from '@material-ui/core/Paper'
import { loginAndCreateUser } from './materialUI'

const LoginComp = (props) => {
    const [un, setUn] = useState("");
    const [pwd, setPwd] = useState("");

    const login = async (e) => {
        e.preventDefault();
        let unConvert = un.toLowerCase();
        let user = await utils.checkLogin(unConvert, pwd);
        if (user.valid) {
            let loginData = await utils.getLoginData(user.id);
            let start = new Date();
            let actionObj = { type: "LOGIN", payload: { id: user.id, fname: loginData.fname, admin: loginData.admin, permissions: loginData.permissions, timer: start, sessionTimeout: loginData.sessionTimeout } };
            props.dispatch(actionObj);
            props.history.push('/movies/1')
        }
        else {
            alert("Invalid Username/Password!")
        }
    }



    const loginComp = loginAndCreateUser();
    return (
        <Container style={{ paddingTop: "100px" }}>
            <Grid container justify="center">
                <Paper className={loginComp.root}>
                    <Grid item container direction="column" justify="center" alignItems="center">
                        <h1 xs={12} style={{ marginBottom: "0px" }}>Welcome to the TV Shows Subscriptions Site</h1>
                        <h3 xs={12}>Log In</h3>
                        <form onSubmit={e => login(e)}>
                            <TextField xs={12} type="text" label="Username" onChange={e => setUn(e.target.value)} /> <br />
                            <TextField xs={12} type="password" label="Password" onChange={e => setPwd(e.target.value)} /> < br /><br />
                            <Button xs={12} type="submit">Login</Button>< br /> <br />
                        </form>
                        <span xs={12}>New Here? <Link style={{ color: "#ffd369" }} to="/createAccount">Create a New Account</Link></span><br /><br />
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    )
}

export default connect()(LoginComp);