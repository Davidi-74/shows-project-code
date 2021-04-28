import React, { useEffect, useState } from 'react'
import movieUtils from '../Movies/movieUtils'
import subsUtils from './subsUtils'
import { TextField, Button, MenuItem, Select, InputLabel, Paper } from '@material-ui/core'
import { innerButtons } from '../materialUI'

const AddSub = (props) => {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [flag, setFlag] = useState(false);
    const [options, setOptions] = useState([])
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const getMovies = async () => {
        let movies = await movieUtils.getNamesAndIds();
        movies.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase();
            if (nameA < nameB)
                return -1;
            if (nameA > nameB)
                return 1;
            return 0;
        });
        setMovies(movies)
        setFlag(true);
    }

    const getWatched = () => {
        if (props.subs.length > 0) {
            let watched = props.subs.map((sub) => {
                return sub.movieId;
            })
            setWatched(watched)
        }
    }

    const removeWatched = () => {
        let movDupe = [...movies];
        watched.forEach((id) => {
            let newDupe = movDupe.filter(movie => movie.id != id)
            movDupe = newDupe;
        })
        let options = movDupe.map((movie, index) => {
            return (
                <MenuItem key={movie.id} value={movie.id}>{movie.name}</MenuItem>
            )
        })
        setOptions(options);
    }

    const subscribe = async () => {
        if (selectedDate != "" && selectedMovie != "") {
            let date = new Date(selectedDate);
            let obj = {
                memberId: props.memberId,
                movies: [{
                    movieId: selectedMovie,
                    date: date
                }]
            }
            await subsUtils.subscribe(obj);
            props.added();
        }
        else {
            alert("Please make sure to choose a TV Show and date!")
        }
    }

    useEffect(() => {
        getMovies();
    }, [])

    useEffect(() => {
        getWatched();
    }, [])

    useEffect(() => {
        if (flag) {
            removeWatched();
        }
    }, [flag])

    useEffect(() => {
        getWatched();
        removeWatched();
    }, [props])

    const classes = innerButtons();

    return (
        <div>
            <Paper style={{ backgroundColor: "#222831", width: "500px" }}>
                <h3>Subscribe to a New TV Show</h3>
                <TextField defaultValue="" select label="TV Show" style={{ backgroundColor: "#393e46" }} InputLabelProps={{ shrink: true }} onChange={(e) => { console.log(e.target.value); setSelectedMovie(e.target.value) }}><br />
                    {options}
                </TextField><br /><br />
                <TextField type="date" label="Date Watched" style={{ backgroundColor: "#393e46" }} InputLabelProps={{ shrink: true }} onChange={(e) => setSelectedDate(e.target.value)} /> <br /><br />
                <Button className={classes.outlined} onClick={subscribe}>Subscribe</Button><br /><br />
            </Paper>
        </div >
    )
}

export default AddSub