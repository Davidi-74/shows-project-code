import React, { useState, useEffect } from 'react'
import movieUtils from './movieUtils'
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import MuiToolbar from '../MuiToolbar'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import '../classes.css'
import Skeleton from '@material-ui/lab/Skeleton';

const SpecificMovie = (props) => {
    const [movie, setMovie] = useState({});
    const [premiered, setPremiered] = useState("");
    const [genres, setGenres] = useState("");
    const [flag, setFlag] = useState(false);
    const [refresh, setRefresh] = useState(true);

    const getMovie = async (id) => {
        let movie = await movieUtils.getById(id);
        setMovie(movie);
    }

    const deleteMovie = async () => {
        await movieUtils.deleteMovie(props.match.params.id);
        props.deleted();
    }

    const editMovie = () => {
        let actionObj = { type: "EDITMOVIE", payload: { id: props.match.params.id } };
        props.dispatch(actionObj);
        props.history.push('/editMovie')
    }

    if (props.searched) {
        if (refresh) {
            getMovie(props.match.params.id)
            setRefresh(false)
        }
    }

    useEffect(() => {
        getMovie(props.match.params.id)
        setFlag(true);
    }, [])

    useEffect(() => {
        if (flag) {
            let premiered = new Date(movie.premiered)
            premiered = premiered.getFullYear();
            setPremiered(premiered);

            let genres = movie.genres;
            if (genres.length == 0) {
                setGenres("No genres available!")
            }
            else {
                let genresUI = "";
                genres.forEach((genre, index) => {
                    if (index == genres.length - 1) {
                        let temp = genre;
                        genresUI = genresUI + temp;
                    }
                    else {
                        let temp = genre + ", ";
                        genresUI = genresUI + temp;
                    }
                });
                setGenres(genresUI)
            }
        }
    }, [movie])

    return (
        <Container>
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            <Box className="innerBox">
                <Grid container justify="center">
                    <Paper style={{ marginTop: "20px" }}>
                        {genres && (
                            <div>
                                <Grid container justify="center" direction="column" alignItems="center">
                                    <Paper style={{ width: "215px", height: "300px", backgroundColor: "#222831", paddingTop: "5px", paddingLeft: "2px", paddingRight: "2px" }}>
                                        <Box paddingTop="0">
                                            <img src={movie.image} style={{ borderRadius: 3 }} />
                                        </Box>
                                    </Paper>
                                    <h3>{movie.name}, {premiered}</h3>
                                    {genres} <br /> <br />
                                    <ButtonGroup>
                                        <Button onClick={() => { props.history.push('/subscriptions') }}>Back</Button>
                                        <Button onClick={editMovie}>Edit</Button>
                                        <Button onClick={deleteMovie}>Delete</Button>
                                    </ButtonGroup>
                                </Grid>
                            </div>
                        )}

                        {!genres && (
                            <span>
                                <Grid container justify="center" alignItems="center" direction="column">
                                    <Skeleton width="210px" height="300px" />
                                    <Skeleton width="270px" height="24px" />
                                    <Skeleton width="200px" height="24px" />
                                    <Skeleton width="400px" height="40px" style={{ marginBottom: 0 }} />
                                </Grid>
                            </span>
                        )}
                        <br /><br />
                    </Paper>
                </Grid>
            </Box>
        </Container>
    )
}

export default connect()(SpecificMovie)