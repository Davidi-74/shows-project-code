import React, { useEffect, useState } from 'react'
import { connect, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import membersUtils from './membersUtils'
import MuiToolbar from '../MuiToolbar'
import { Paper, Button, TextField, ButtonGroup, Container, Grid, Box } from '@material-ui/core'
import '../classes.css'

const EditMember = (props) => {
    const id = useSelector(state => state.editMember.id)
    const [member, setMember] = useState({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const getMember = async () => {
        let member = await membersUtils.getMemberByID(id);
        setMember(member.member);
    }

    const setStartingValues = () => {
        setName(member.name)
        setEmail(member.email)
        setCity(member.city)
    }

    const cancel = () => {
        let actionObj = { type: "EDITMEMBER", payload: { id: "" } };
        props.dispatch(actionObj);
        props.history.push('/subscriptions')
    }

    const edit = async () => {
        if (name != "" && email != "" && city != "") {
            let obj = {
                name: name,
                email: email,
                city: city
            }
            await membersUtils.updateMember(id, obj);
            props.history.push('/subscriptions')
        }
        else {
            alert("Please make sure to enter valid values!")
        }
    }

    useEffect(() => {
        getMember();
    }, [])

    useEffect(() => {
        setStartingValues();
    }, [member])

    return (
        <Container >
            <Box style={{ marginBottom: "160px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <Grid container justify="center">
                    <Paper>
                        <h3>Edit {member.name}</h3>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)}></TextField><br />
                        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)}></TextField><br />
                        <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)}></TextField><br /><br />

                        <ButtonGroup>
                            <Button onClick={cancel}>Cancel</Button>&nbsp;
                        <Button onClick={edit}>Edit</Button>
                        </ButtonGroup><br /><br />
                    </Paper>
                </Grid>
            </Box>
        </Container>
    )
}

export default withRouter(connect()(EditMember))