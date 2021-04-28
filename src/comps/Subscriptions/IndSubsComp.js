import React, { useEffect, useState } from 'react'
import movieUtils from '../Movies/movieUtils'
import { Link } from 'react-router-dom'
import AddSub from './AddSubscription';
import '../classes.css'
import { Button, ListItem, ListItemText, Grid, Divider } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const IndSubs = (props) => {
    const [movies, setMovies] = useState([]);
    const [moviesUI, setMoviesUI] = useState(null);
    const [flag, setFlag] = useState(false);
    const [addButton, setAddButton] = useState("collapse");

    const getMovies = async () => {
        let subs = props.subs;
        let arr = await getMoviesArr(subs);
        setMovies(arr);
        setFlag(true)
    }

    const getMoviesArr = async (subs) => {
        let arr = [];
        for (const sub of subs) {
            let movie = await movieUtils.getNameById(sub.movieId);
            arr.push(movie);
        }
        return arr;
    }

    const createMoviesUI = () => {
        let tempArr = movies.map((name, index) => {
            let tempDate = props.subs[index].date;
            let tempId = props.subs[index].movieId;
            let obj = {
                name: name,
                date: tempDate,
                id: tempId
            }
            return obj
        })

        tempArr.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        })

        let moviesUI = tempArr.map((movie, index) => {
            let temp = movie.date;
            let date = new Date(temp);
            date = date.toLocaleDateString('en-gb');
            return (
                <ListItem key={"movie" + index}>
                    <ListItemText><span><Link style={{ color: "#ffd369" }} to={`/movie/${movie.id}`}>{movie.name}</Link>, {date}</span></ListItemText>
                </ListItem>
            )
        })
        setMoviesUI(moviesUI)
    }

    const addButtonVisibility = () => {
        if (addButton == "collapse") {
            setAddButton("visible")
        }
        else {
            setAddButton("collapse")
        }
    }

    const addedMovie = () => {
        addButtonVisibility();
        setFlag(false);
        props.added();
    }

    useEffect(() => {
        getMovies();
    }, [])

    useEffect(() => {
        getMovies();
    }, [props.subs])

    useEffect(() => {
        if (flag) {
            createMoviesUI();
        }
    }, [flag == true])

    return (
        <div>
            {moviesUI && (
                <div>
                    <h4 style={{ marginBottom: "10px" }}>TV Shows Watched</h4>
                    <Divider style={{ marginBottom: "10px", height: "2px" }} />
                    <ul>
                        {moviesUI}
                    </ul><br />
                </div>
            )}

            {!moviesUI && (
                <div>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Skeleton width="200px" />
                        <Skeleton height="325px" width="350px" />
                    </Grid>
                </div>
            )}

            <Button onClick={addButtonVisibility} style={{ width: "300px" }} >Subscribe to a New TV Show</Button><br /><br />
            <div className={addButton}>
                <AddSub subs={props.subs} subbed={addButtonVisibility} memberId={props.memberId} added={addedMovie} />
            </div><br />
        </div>
    )
}

export default IndSubs