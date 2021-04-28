import React, { useEffect, useState } from 'react'
import movieUtils from './movieUtils'
import { TextField, InputAdornment, Button, Grid, Divider } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';


const SearchComp = (props) => {
    const [str, setStr] = useState("");
    const [searched, setSearched] = useState(false);

    const search = async (e) => {
        console.log(str);
        setSearched(true);
        if (e != "") {
            e.preventDefault();
        }
        if (str == "") {
            props.search(-1);
        }
        else {
            let ids = await movieUtils.searchMovie(String(str));
            props.search(ids);
        }
    }

    useEffect(() => {
        if (str == "" && searched) {
            search("")
            setSearched(false)
        }
    }, [str])

    return (
        <div>
            <form onSubmit={(e) => search(e)}>
                <TextField
                    placeholder="Search..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" style={{ marginBottom: "12px" }}>
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{
                        style: {
                            marginBottom: "12px"
                        }
                    }}
                    style={{ width: "300px", marginBottom: "20px" }}
                    onChange={(e) => setStr(e.target.value)}
                />
            </form>
        </div>
    )
}

export default SearchComp