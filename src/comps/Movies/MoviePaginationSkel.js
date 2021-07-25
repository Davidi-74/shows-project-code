import { useEffect } from "react";
import { useState } from "react"
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid } from "@material-ui/core";

const MoviePaginationSkel = (props) => {
    const [skels, setSkels] = useState([]);

    const createSkels = () => {
        let skels = [];
        for (let i = 0; i < 12; i++) {
            let singleSkel = <Grid container item alignItems="center" justify="center" xs={4} xl={3}>
                <Skeleton width="400px" height="540px" />
            </Grid>
            skels.push(singleSkel);
        }
        setSkels(skels)
    }

    useEffect(() => {
        createSkels();
    }, [])

    return (
        skels
    )
}

export default MoviePaginationSkel