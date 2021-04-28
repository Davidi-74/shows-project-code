import { Container, Paper, Grid, TextField, Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react'
import utils from './userUtils'
import { loginAndCreateUser } from '../materialUI'

const CreateUser = (props) => {
    const [un, setUn] = useState("");
    const [pwd, setPwd] = useState("");

    const created = async () => {
        if (un != "" && pwd != "") {
            let valid = await utils.userCreatedByAdmin(un, pwd);
            if (valid == "exists") {
                alert("User Already Exists!")
            }
            else if (!valid) {
                alert("User Not Found! Please Contact the System Admin")
            }
            else if (valid) {
                alert("User Created!");
                props.history.push('/');
            }
        }
        else {
            alert("Please make sure to fill out each field!")
        }
    }

    const createUser = loginAndCreateUser();
    return (
        <Container style={{ paddingTop: "100px" }}>
            <Grid container justify="center">
                <Paper className={createUser.root}>
                    <div>
                        <h1>Welcome to the TV Shows Subscriptions Site</h1>
                        <h3>Create Account</h3>
                        <TextField label="Username" onChange={e => setUn(e.target.value)} /><br />
                        <TextField label="Password" type="password" onChange={e => setPwd(e.target.value)} /><br /><br />
                        <ButtonGroup>
                            <Button onClick={() => props.history.push('/')} >Cancel</Button>
                            <Button onClick={created}>Create User</Button>
                        </ButtonGroup><br /><br /><br />
                    </div>
                </Paper>
            </Grid>
        </Container>
    )
}

export default CreateUser
