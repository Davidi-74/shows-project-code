import React, { useEffect, useState } from 'react'
import AddMovie from './AddMovie'
import { Button, ButtonGroup, Container, Box } from '@material-ui/core'
import MuiToolbar from '../MuiToolbar'
import { outterButtons } from '../materialUI'
import '../classes.css'
import MoviePagination from './MoviePagination'

const MoviesPage = (props) => {
    const [page, setPage] = useState(props.match.params.page);
    const [currentComp, setCurrentComp] = useState(<MoviePagination key={page} history={props.history} />)

    useEffect(() => {
        setPage(props.match.params.page);
    }, [props.match.params.page])

    const classes = outterButtons();
    return (
        <Container>
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <h3>TV Shows</h3>
                <ButtonGroup>
                    <Button className={classes.outlined} onClick={() => setCurrentComp(<MoviePagination history={props.history} />)}>All TV Shows</Button>&nbsp;
                    <Button className={classes.outlined} onClick={() => setCurrentComp(<AddMovie added={() => setCurrentComp(<MoviePagination history={props.history} />)} />)}>Add TV Show</Button>
                </ButtonGroup> <br /><br />
                {currentComp}
            </Box>
        </Container>
    )
}

export default MoviesPage