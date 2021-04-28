import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import AddUser from './AddUser';
import AllUsers from './AllUsers';
import { Container, Button, ButtonGroup, Box } from '@material-ui/core';
import MuiToolbar from '../MuiToolbar'
import { outterButtons } from '../materialUI'
import '../classes.css'

const UsersManagement = (props) => {
    const user = useSelector(state => state.user);
    const [currentComp, setCurrentComp] = useState(<AllUsers />);

    const isAdmin = () => {
        if (!user.admin) {
            props.history.push('/')
        }
    }

    useEffect(() => {
        isAdmin();
    }, [])

    const classes = outterButtons();

    return (
        <Container>
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <h3>Users</h3>
                <ButtonGroup>
                    <Button className={classes.outlined} onClick={() => setCurrentComp(<AllUsers added={() => setCurrentComp(<AllUsers />)} />)}>All Users</Button>&nbsp;
                        <Button className={classes.outlined} onClick={() => setCurrentComp(<AddUser added={() => setCurrentComp(<AllUsers />)} />)}>Add User</Button>
                </ButtonGroup><br /><br />
                {currentComp}
            </Box>
        </Container>
    )
}

export default UsersManagement;