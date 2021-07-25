import React, { createRef, useEffect, useState } from 'react'
import movieUtils from './movieUtils';
import IndMovie from './IndMovieComp'
import { useSelector } from 'react-redux';
import SearchComp from './SearchComp';
import '../classes.css'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination';
import { useLocation, withRouter } from 'react-router';
import MoviePaginationSkel from './MoviePaginationSkel';

const MoviePagination = (props) => {
    const location = useLocation();
    const getCurrentPage = () => {
        let temp = location.pathname.split('/');
        let page = Number(temp[temp.length - 1])
        return page;
    }
    const user = useSelector(state => state.user);
    const [ids, setIds] = useState([]);
    const [items, setItems] = useState("");
    const [permit, setPermit] = useState(false)
    const [searchFlag, setSearchFlag] = useState(false);
    const [permited, setPermited] = useState("visible")
    const [page, setPage] = useState(getCurrentPage());
    const parent = createRef();
    const [count, setCount] = useState(1);
    const [showingSearched, setShowingSearched] = useState(false);

    const getMovies = async () => {
        let ids = await movieUtils.getIdsByPage(page);
        setIds(ids);
    }

    const getPagesCount = async () => {
        let count = await movieUtils.getPagesCount();
        setCount(count);
    }

    const createMoviesUI = () => {
        if (permit) {
            if (ids.length > 0) {
                let newItems = ids.map((id, index) => {
                    return (
                        <Grid container item xs={4} xl={3} justify="center">
                            <Paper style={{ width: "400px" }} key={"movie" + index} >
                                <IndMovie id={id} key={"movie" + index} deleted={movieDeleted} searched={searchFlag} />
                            </Paper>
                        </Grid>
                    )
                })
                setItems(newItems)
                setSearchFlag(false)
            }
            else {
                setItems(<span><br />No Matching Results!</span>)
            }
        }
    }

    const movieDeleted = () => {
        if (ids.length <= 1) {
            setPage(page - 1);
            props.history.push(`/movies/${page - 1}`)
        }
    }

    const searched = (newIds) => {
        setIds([]);
        if (newIds == -1) {
            getMovies();
            setShowingSearched(false)
        }
        else {
            setShowingSearched(true)
            setSearchFlag(true)
            setIds(newIds);
        }
    }

    const getPage = (event, value) => {
        setPage(value)
        props.history.push(`/movies/${value}`)
        parent.current.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "View Movies") {
                currentPermit = true;
                setPermit(true);
            }
        });
        if (currentPermit) {
            getMovies();
        }
        else {
            let item = <div>
                <h4>We're Sorry!</h4>
                <h4>This page is visible only to users with the right permission</h4>
            </div>;
            setItems(item)
            setPermited("collapse")
        }
    }, [])

    useEffect(() => {
        getPagesCount();
    }, [page])

    useEffect(() => {
        getMovies();
    }, [page])

    useEffect(() => {
        createMoviesUI();
    }, [ids])

    return (
        <div style={{ paddingBottom: "30px" }} ref={parent}>
            <Grid>
                <Grid item xs={12}>
                    <span className={permited}><SearchComp search={(ids) => searched(ids)} /></span>
                </Grid>
                <Grid container item direction="row" alignItems="center" justify="center">
                    {
                        items !== "" ?
                            items
                            :
                            <MoviePaginationSkel />
                    }
                </Grid>
                <Grid item container justify="center" style={{ marginTop: "20px" }}>
                    <Pagination style={{ visibility: (!showingSearched && permited == "visible") ? "visible" : "collapse" }} count={count} page={page} boundaryCount={1} siblingCount={1} onChange={getPage} />
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(MoviePagination)