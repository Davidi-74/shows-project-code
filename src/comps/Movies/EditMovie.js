import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router';
import { connect, useSelector } from 'react-redux'
import movieUtils from './movieUtils'
import '../classes.css'
import { Paper, Button, TextField, ButtonGroup, Container, Grid, Box } from '@material-ui/core'
import MuiToolbar from '../MuiToolbar'
import '../classes.css'

const EditMovie = (props) => {
    const id = useSelector(state => state.editMovie.id)
    const user = useSelector(state => state.user);
    const [movie, setMovie] = useState({});
    const [name, setName] = useState("");
    const [genres, setGenres] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [premiered, setPremiered] = useState();
    // const [permit, setPermit] = useState("visible")
    // const [isPermited, setIsPermited] = useState("");

    const cancel = () => {
        let actionObj = {
            type: "EDITMOVIE",
            payload: { id: "" }
        }
        props.dispatch(actionObj);
        props.history.push('/movies/1');
    }

    const getMovie = async (id) => {
        let movie = await movieUtils.getById(id);
        setMovie(movie);
    }

    const update = async () => {
        if (name != "" && genres.length > 0 && imgUrl != "") {
            let premierdDate = new Date(premiered);
            const re = /\s*(?:,|$)\s*/
            let genresArr = String(genres).split(re);
            let movie = {
                name: name,
                image: imgUrl,
                premiered: premierdDate,
                genres: genresArr
            }
            await movieUtils.updateMovie(id, movie);
            props.history.push('/movies')
        }
        else {
            alert("Please make sure you enter valid values!")
        }
    }

    useEffect(() => {
        getMovie(id)
    }, [])

    useEffect(() => {
        const createMovieUI = () => {
            setName(movie.name)
            setImgUrl(movie.image)
            setGenres(movie.genres)
            let formattedDate = movieUtils.formatDate(movie.premiered);
            setPremiered(formattedDate)
        }
        createMovieUI();
    }, [movie])

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Update Movies") {
                currentPermit = true;
            }
        });
        if (!currentPermit) {
            let item = (
                <div>
                    <h4>We're Sorry!</h4>
                    <h4>This page is visible only to users with the right permission</h4>
                </div>
            )
            // setIsPermited(item)
            // setPermit("collapse");
        }
    }, [])

    return (
        <Container>
            <Box style={{ marginBottom: "150px" }}>
                <MuiToolbar history={props.history} /><br />
            </Box>
            {/* {isPermited} */}
            <Box className="innerBox">
                <Grid container justify="center">
                    <Paper style={{ marginTop: "5vh" }}>
                        <h3>Edit {movie.name}</h3>
                        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} /><br />
                        <TextField label="Genres" value={genres} onChange={(e) => setGenres(e.target.value)} /><br />
                        <TextField label="Image URL" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} /><br />
                        <TextField label="Premiered" value={premiered} type="date" onChange={(e) => setPremiered(e.target.value)} InputLabelProps={{ shrink: true }} /><br /><br />
                        <ButtonGroup>
                            <Button onClick={cancel}>Cancel</Button>&nbsp;
                            <Button onClick={update}>Edit</Button>
                        </ButtonGroup><br /><br />
                    </Paper>
                </Grid>
            </Box>
        </Container>
    )
}

export default withRouter(connect()(EditMovie))