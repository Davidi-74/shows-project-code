import React, { useState, useEffect } from 'react'
import membersUtils from './membersUtils';
import { useSelector } from 'react-redux';
import '../classes.css'
import { Paper, Button, TextField, ButtonGroup } from '@material-ui/core'


const AddMembers = (props) => {
    const user = useSelector(state => state.user);
    const [permit, setPermit] = useState("visible")
    const [isPermited, setIsPermited] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");

    const add = async () => {
        if (name != "" && email != "" && city != "") {
            let obj = {
                name: name,
                email: email,
                city: city
            }
            await membersUtils.createMember(obj);
            props.added();
        }
        else {
            alert("Please make sure to enter valid values!")
        }
    }

    useEffect(() => {
        let currentPermit = false;
        user.permissions.forEach(perm => {
            if (perm == "Create Subscriptions") {
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
            <div className={permit} >
                <Paper>
                    <h3>Add a New Member</h3>
                    <TextField label="Name" onChange={(e) => setName(e.target.value)}></TextField><br />
                    <TextField label="Email" onChange={(e) => setEmail(e.target.value)}></TextField><br />
                    <TextField label="City" onChange={(e) => setCity(e.target.value)}></TextField><br /><br />

                    <ButtonGroup>
                        <Button onClick={props.added}>Cancel</Button>&nbsp;
                        <Button onClick={add}>Add</Button>
                    </ButtonGroup><br /><br />
                </Paper>
            </div>
        </div>
    )
}

export default AddMembers