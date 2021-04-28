import React, { useEffect, useState } from 'react'
import movieUtils from './movieUtils';
import { withRouter } from 'react-router-dom'
import { connect, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Skeleton from '@material-ui/lab/Skeleton'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const IndMovie = (props) => {
    const user = useSelector(state => state.user)
    const [movie, setMovie] = useState({});
    const [premiered, setPremiered] = useState("");
    const [genres, setGenres] = useState(null);
    const [flag, setFlag] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [open, setOpen] = useState(false);

    const getMovie = async (id) => {
        let movie = await movieUtils.getById(id);
        setMovie(movie);
    }

    const deleteMovie = async () => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Delete Movies") {
                currentPermit = true;
            }
        });
        if (currentPermit) {
            await movieUtils.deleteMovie(props.id);
            props.deleted();
        }
        else {
            alert("This option is available only to users with the right permission!")
        }
    }

    const editMovie = () => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Update Movies") {
                currentPermit = true;
            }
        });
        if (currentPermit) {
            let actionObj = { type: "EDITMOVIE", payload: { id: props.id } };
            props.dispatch(actionObj);
            props.history.push('/editMovie')
        }
        else {
            alert("This option is available only to users with the right permission!")
        }
    }

    if (props.searched) {
        if (refresh) {
            getMovie(props.id)
            setRefresh(false)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getMovie(props.id)
        setFlag(true);
    }, [props.id])

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
        <div>
            {genres && (
                <div>
                    <Grid container justify="center" direction="column" alignItems="center">
                        <Paper style={{ width: "215px", height: "300px", backgroundColor: "#222831", paddingTop: "5px", paddingLeft: "2px", paddingRight: "2px" }}>
                            <Box paddingTop="0">
                                <img src={movie.image} style={{ borderRadius: 3 }} />
                            </Box>
                        </Paper>
                        <h3>{movie.name}, {premiered}</h3>
                        {/* <b>Genres: </b> */}
                        {genres} <br /> <br />
                        <ButtonGroup>
                            <Button onClick={editMovie}>Edit</Button>
                            <Button onClick={handleClickOpen}>Delete</Button>
                        </ButtonGroup>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <Box textAlign="left">
                                <DialogTitle id="alert-dialog-title">{`Delete ${movie.name}?`}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" style={{ color: "#f7fbfc" }}>
                                        {`${movie.name} will be deleted permanently and we will not be able to restore it.`}
                                    </DialogContentText>
                                </DialogContent>
                            </Box>
                            <DialogActions>
                                <Button onClick={handleClose} >
                                    Cancel
                            </Button>
                                <Button onClick={() => { handleClose(); deleteMovie(); }} autoFocus>
                                    Delete
                            </Button>
                            </DialogActions>
                        </Dialog>
                        <br /><br />
                    </Grid>
                </div>
            )}

            {!genres && (
                <div>
                    <Grid container justify="center" alignItems="center" direction="column">
                        <Skeleton width="210px" height="300px" />
                        <Skeleton width="270px" height="24px" />
                        <Skeleton width="200px" height="24px" />
                        <Skeleton width="300px" height="40px" style={{ marginBottom: "30px" }} />
                    </Grid>
                </div>
            )}
        </div>
    )
}

export default withRouter(connect()(IndMovie))