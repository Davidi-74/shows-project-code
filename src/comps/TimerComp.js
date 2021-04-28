import React, { useEffect, useState } from 'react'
import { useSelector, connect } from 'react-redux'
import Skeleton from '@material-ui/lab/Skeleton'

const TimerComp = (props) => {
    const sessionStart = useSelector(state => state.user.timer);
    const sessionTimeout = useSelector(state => state.user.sessionTimeout)
    const [timer, setTimer] = useState("");

    const createTimer = () => {
        let countDownDate = new Date(sessionStart.getTime() + (sessionTimeout));
        let x = setInterval(function () {
            let now = new Date().getTime();
            let distance = countDownDate - now;
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
            let temp = "Session Time: " + minutes + "m " + seconds + "s";
            setTimer(temp);
            if (distance < 0) {
                clearInterval(x);
                logout();
            }
        }, 1000);
    }

    const logout = () => {
        let actionObj = { type: "LOGOUT" };
        props.dispatch(actionObj);
        props.history.push('/')
    }

    useEffect(() => {
        createTimer();
    }, [])

    return (
        <div>
            {timer && (
                <div style={{ color: "#acafb0", fontSize: 14 }}>
                    {timer}
                </div>
            )}

            {!timer && (
                <Skeleton width="150px" height="17px" animation="wave" style={{ paddingRight: "0px", marginBottom: "0px" }} />
            )}
        </div>
    )
}

export default connect()(TimerComp)