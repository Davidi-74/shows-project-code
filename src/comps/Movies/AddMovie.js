import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../classes.css'
import movieUtils from './movieUtils'
import { Paper, Grid, Button, TextField, ButtonGroup } from '@material-ui/core'


const AddMovie = (props) => {
    const user = useSelector(state => state.user);
    const [permit, setPermit] = useState("visible")
    const [isPermited, setIsPermited] = useState("");
    const [name, setName] = useState("");
    const [genres, setGenres] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [premiered, setPremiered] = useState(null);

    const createMovie = async () => {
        if (name != "" && genres != "" && imgUrl != "" && premiered != null) {
            let premierdDate = new Date(premiered);
            const re = /\s*(?:,|$)\s*/
            let genresArr = genres.split(re);
            let movie = {
                name: name,
                genres: genresArr,
                image: imgUrl,
                premiered: premierdDate
            }
            console.log(movie);
            await movieUtils.createMovie(movie);
            props.added();
        }
        else {
            alert("Please make sure to fill out every field!")
        }
    }

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Create Movies") {
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
            setIsPermited(item)
            setPermit("collapse");
        }
    }, [])

    return (
        <div>
            {isPermited}
            <span className={permit}>
                <Grid container justify="center">
                    <Paper>
                        <h3>Add a New TV Show</h3>
                        <TextField label="Name" onChange={(e) => setName(e.target.value)} /><br />
                        <TextField label="Genres" onChange={(e) => setGenres(e.target.value)} /><br />
                        <TextField label="Image URL" onChange={(e) => setImgUrl(e.target.value)} /><br />
                        <TextField label="Premiered" type="date" onChange={(e) => setPremiered(e.target.value)} InputLabelProps={{ shrink: true }} /><br /><br />
                        <ButtonGroup>
                            <Button onClick={props.added}>Cancel</Button>&nbsp;
                            <Button onClick={createMovie}>Create</Button>
                        </ButtonGroup><br /><br />
                    </Paper>
                </Grid>
            </span>
        </div>
    )
}

export default AddMovie