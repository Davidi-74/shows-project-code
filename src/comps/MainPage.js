import React, { useEffect, useState } from 'react'
import { useSelector, connect } from 'react-redux'
import './classes.css'
import UsersManagement from './Users/UsersManagement'
import { Container, Grid } from '@material-ui/core'
import MuiToolbar from './MuiToolbar'

const MainPage = (props) => {
    const user = useSelector(state => state.user)
    const [UMButton, setUMButton] = useState(<span></span>);
    const [currentComp, setCurrentComp] = useState(<span></span>);

    const isAdmin = () => {
        if (user.admin) {
            setUMButton(<span><input type="button" value="Users Management" className={UMButton} onClick={() => setCurrentComp(<UsersManagement />)} />&nbsp;</span>)
        }
    }

    useEffect(() => {
        isAdmin();
    }, [])

    return (
        <div>
            <Container maxWidth={false} style={{ paddingTop: "10vh" }} >
                <MuiToolbar history={props.history} />
                <Grid>
                    <br />
                    <br />
                    {currentComp}
                </Grid>
            </Container>
        </div>
    )
}

export default connect()(MainPage)