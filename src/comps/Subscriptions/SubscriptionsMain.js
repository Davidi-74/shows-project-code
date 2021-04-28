import React, { useState } from 'react'
import AddMembers from '../Members/AddMembers'
import AllMembers from '../Members/AllMembers'
import MuiToolbar from '../MuiToolbar'
import { Button, ButtonGroup, Container, Grid, Box } from '@material-ui/core'
import { outterButtons } from '../materialUI'
import '../classes.css'

const SubsMain = (props) => {
    const [currentComp, setCurrentComp] = useState(<AllMembers />)

    const classes = outterButtons();
    return (
        <Container >
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <Grid container direction="column"
                    justify="space-evenly"
                    alignItems="center" >
                    <h3>Subscriptions</h3>
                    <ButtonGroup>
                        <Button className={classes.outlined} onClick={() => setCurrentComp(<AllMembers />)}>All Members</Button>&nbsp;
                    <Button className={classes.outlined} onClick={() => setCurrentComp(<AddMembers added={() => setCurrentComp(<AllMembers />)} />)}>Add Member</Button>
                    </ButtonGroup>
                    {currentComp}
                </Grid>
            </Box>
        </Container>
    )
}

export default SubsMain